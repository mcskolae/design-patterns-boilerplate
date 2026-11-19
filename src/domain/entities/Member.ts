import { InvalidFirstNameError } from "../errors/InvalidFirstNameError";
import { InvalidLastNameError } from "../errors/InvalidLastNameError";
import { Email } from "../value-objects/Email";
import { MemberId } from "../value-objects/MemberId";

export interface MemberProps {
  readonly id: MemberId;
  readonly email: Email;
  readonly lastName: string;
  readonly firstName: string;
}

export class Member {
  private constructor(
    private readonly id: MemberId,
    private readonly email: Email,
    private readonly lastName: string,
    private readonly firstName: string,
  ) {
  }

  /**
   * @throws InvalidLastNameError
   * @throws InvalidFirstNameError
   */
  public static register(props: MemberProps): Member {
    const lastName = props.lastName.trim();
    const firstName = props.firstName.trim();

    if (lastName.length === 0) {
      throw new InvalidLastNameError();
    }

    if (firstName.length === 0) {
      throw new InvalidFirstNameError();
    }

    return new Member(props.id, props.email, lastName, firstName);
  }

  public static restore(props: MemberProps): Member {
    return new Member(props.id, props.email, props.lastName, props.firstName);
  }

  public getId(): MemberId {
    return this.id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getFirstName(): string {
    return this.firstName;
  }
}
