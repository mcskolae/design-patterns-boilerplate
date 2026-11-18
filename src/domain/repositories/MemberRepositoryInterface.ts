import Member from "../entities/Member";
import Email from "../value-objects/Email";
import MemberId from "../value-objects/MemberId";

interface MemberRepositoryInterface {
  nextIdentity(): Promise<MemberId>;

  findById(id: MemberId): Promise<Member | null>;

  findByEmail(email: Email): Promise<Member | null>;

  /** @throws EmailAlreadyExistsError si un AUTRE adhérent possède déjà cet email (garde-fou en cas d'accès concurrent). */
  save(member: Member): Promise<void>;
}

export default MemberRepositoryInterface;
