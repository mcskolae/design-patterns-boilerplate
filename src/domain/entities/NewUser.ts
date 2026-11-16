import InvalidEmailError from "../errors/InvalidEmailError";
import InvalidFirstNameError from "../errors/InvalidFirstNameError";
import InvalidLastNameError from "../errors/InvalidLastNameError";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class NewUser {
  private constructor(
    private readonly email: string,
    private readonly lastName: string,
    private readonly firstName: string) {
  }

  public static new(email: string, lastName: string, firstName: string): NewUser {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedLastName = lastName.trim().toLowerCase();
    const normalizedFirstName = firstName.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      throw new InvalidEmailError();
    }

    if (normalizedLastName.length === 0) {
      throw new InvalidLastNameError();
    }

    if (normalizedFirstName.length === 0) {
      throw new InvalidFirstNameError();
    }

    return new NewUser(normalizedEmail, normalizedLastName, normalizedFirstName);
  }

  public getEmail(): string {
    return this.email;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getFirstName(): string {
    return this.firstName;
  }
}

export default NewUser;
