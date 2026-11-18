import InvalidEmailError from "../errors/InvalidEmailError";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Email {
  private constructor(private readonly value: string) {
  }

  /** @throws InvalidEmailError si la forme normalisée ne respecte pas `local@domaine.extension`. */
  public static from(raw: string): Email {
    const normalized = raw.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalized)) {
      throw new InvalidEmailError();
    }

    return new Email(normalized);
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export default Email;
