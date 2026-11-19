import { InvalidEmailError } from "../errors/InvalidEmailError";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email {
  private constructor(private readonly value: string) {
  }

  /** @throws InvalidEmailError */
  public static from(raw: string): Email {
    const normalized = raw.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalized)) {
      throw new InvalidEmailError();
    }

    return new Email(normalized);
  }

  public toString(): string {
    return this.value;
  }
}
