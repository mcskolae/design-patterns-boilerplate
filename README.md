# Bibliothèque municipale

Gestion des adhérents, des emprunts et des retours d'exemplaires. Architecture hexagonale, modèle de domaine DDD, TypeScript strict.

## Contexte métier

Je gère une petite bibliothèque municipale. Aujourd'hui, nous utilisons des fiches papier pour suivre nos adhérents et les livres qu'ils empruntent.

J'aimerais disposer d'une application qui me permette de gérer les inscriptions, les emprunts et les retours de livres.

Voici comment nous travaillons actuellement.

### Situation 1 : un nouvel adhérent arrive

Lorsqu'une personne souhaite s'inscrire, je lui demande son nom, son prénom et son adresse email.

Je vérifie qu'elle n'est pas déjà inscrite avec cette adresse email, car chaque adhérent doit avoir une adresse unique.

Si tout est en ordre, je crée sa fiche et lui attribue un numéro d'adhérent unique, qui lui permettra d'emprunter des livres.

Si son adresse email est déjà enregistrée, je refuse l'inscription et lui explique pourquoi.

### Situation 2 : un adhérent souhaite emprunter un livre

Lorsqu'un adhérent vient emprunter un livre, je commence par retrouver sa fiche grâce à son numéro d'adhérent.

Je vérifie ensuite deux choses :

- Il ne doit pas avoir plus de trois emprunts en cours.
- L'exemplaire du livre qu'il souhaite emprunter doit être disponible.

Nous pouvons posséder plusieurs exemplaires d'un même livre. Chaque exemplaire possède son propre identifiant et ne peut être emprunté que par une seule personne à la fois.

Si toutes les conditions sont réunies, j'enregistre l'emprunt avec la date du jour et une date de retour prévue 14 jours plus tard.

Sinon, je refuse l'emprunt en précisant la raison.

### Situation 3 : un adhérent rapporte un livre

Lorsqu'un livre est rapporté, je retrouve l'emprunt en cours correspondant à son exemplaire.

J'enregistre la date du retour et je rends cet exemplaire à nouveau disponible pour les autres adhérents.

Si le livre est rendu après la date prévue, je souhaite conserver le nombre de jours de retard dans l'historique de l'emprunt.

Pour le moment, nous n'appliquons aucune pénalité financière. Même en retard, un retour est toujours accepté.

Si aucun emprunt en cours ne correspond à cet exemplaire, je veux être informé du problème sans modifier les données.

## Langage métier

| Métier | Code |
| --- | --- |
| Adhérent | `Member` |
| Numéro d'adhérent | `MemberId` |
| Exemplaire d'un livre | `BookCopy` |
| Identifiant d'exemplaire | `BookCopyId` |
| Emprunt | `Loan` |
| Retour d'un emprunt | `LoanReturn` |
| Inscription (situation 1) | `RegisterMember` |
| Emprunt d'un exemplaire (situation 2) | `BorrowBook` |
| Retour d'un exemplaire (situation 3) | `ReturnBook` |

## Règles métier

Les règles chiffrées sont centralisées dans `src/domain/rules/LoanRules.ts`.

| Règle | Implémentation |
| --- | --- |
| Email valide, unique, comparé en minuscules sans espaces de bord | `Email`, `RegisterMember` |
| Nom et prénom non vides après suppression des espaces de bord, casse conservée | `Member.register` |
| Au plus 3 emprunts en cours : le 4e est refusé | `MAX_ACTIVE_LOANS`, `ensureActiveLoanLimitNotReached` |
| Un exemplaire n'est emprunté que par une personne à la fois | `BookCopy.lend` |
| Retour prévu 14 jours après l'emprunt, à la même heure | `LOAN_DURATION_DAYS`, `computeDueDate` |
| Jours de retard : jours calendaires UTC après la date prévue, 0 si rendu le jour prévu | `countLateCalendarDays` |
| Un retour est toujours accepté, sans pénalité ; un emprunt n'est clôturé qu'une fois | `Loan.markAsReturned` |
| Un refus ne modifie aucune donnée | Toutes les vérifications précèdent les écritures dans chaque use case |

## Architecture

```
src/
├── domain/                      Modèle métier, sans dépendance technique
│   ├── entities/                Agrégats : Member, BookCopy, Loan
│   ├── value-objects/           MemberId, BookCopyId, LoanId, Email, LoanReturn
│   ├── rules/                   Constantes et calculs métier
│   ├── repositories/            Ports de persistance
│   └── errors/                  Refus métier, tous dérivés de DomainError
├── application/                 Orchestration des use cases
│   ├── ports/                   ClockInterface
│   ├── dto/                     Résultats exposés : MemberDto, ActiveLoanDto, ReturnedLoanDto
│   └── use-cases/               RegisterMember, BorrowBook, ReturnBook : commande, erreurs, orchestration
└── infrastructure/              Adapters
    ├── http/                    Routes Express, validation des corps, normalizers snake_case, erreurs HTTP
    ├── persistence/in-memory/   Repositories en mémoire
    ├── clock/                   SystemClock
    ├── container.ts             Composition root : instancie les adapters et les use cases
    └── server.ts                Point d'entrée
```

Sens des dépendances : `infrastructure` → `application` → `domain`. Le domaine n'importe rien en dehors de lui-même.

## Use cases

Chaque use case :

- reçoit une commande en types primitifs ;
- la convertit en value objects ;
- fait toutes ses vérifications avant d'écrire ;
- renvoie un DTO, jamais une entité.

| Use case | Commande | Résultat | Erreurs, dans l'ordre de vérification |
| --- | --- | --- | --- |
| `RegisterMember` | `email`, `lastName`, `firstName` | `MemberDto` | `InvalidEmailError`, `EmailAlreadyExistsError`, `InvalidLastNameError`, `InvalidFirstNameError` |
| `BorrowBook` | `memberId`, `copyId` | `ActiveLoanDto` | `InvalidIdentifierError`, `MemberNotFoundError`, `BookCopyNotFoundError`, `LoanLimitReachedError`, `BookCopyNotAvailableError` |
| `ReturnBook` | `copyId` | `ReturnedLoanDto` | `InvalidIdentifierError`, `BookCopyNotFoundError`, `NoActiveLoanError` |

## API HTTP

| Méthode | Route | Corps JSON | Succès |
| --- | --- | --- | --- |
| `GET` | `/health` | | `200` |
| `POST` | `/members` | `{ "email": string, "last_name": string, "first_name": string }` | `201` `MemberResponse` |
| `POST` | `/loans` | `{ "member_id": number, "copy_id": number }` | `201` `ActiveLoanResponse` |
| `POST` | `/returns` | `{ "copy_id": number }` | `200` `ReturnedLoanResponse` |

Les champs JSON, en entrée comme en sortie, sont en `snake_case`. Les types de réponse sont définis dans `src/infrastructure/http/normalizers.ts`.

Erreurs, au format `{ "error": string, "message": string }` :

| Statut | Cas |
| --- | --- |
| `400` | Corps mal formé, email, nom, prénom ou identifiant invalide |
| `404` | Adhérent ou exemplaire inconnu |
| `409` | Email déjà inscrit, exemplaire indisponible, aucun emprunt en cours |
| `422` | Limite d'emprunts atteinte, autre refus métier |
| `500` | Erreur technique |

La persistance est en mémoire. Aucun use case ne crée d'exemplaire : au démarrage, `container.ts` enregistre les exemplaires `1` à `5`, tous disponibles. Les adhérents et les emprunts démarrent vides.

## Démarrage

```bash
pnpm install
pnpm dev
```

Vérification du typage : `pnpm typecheck`.
