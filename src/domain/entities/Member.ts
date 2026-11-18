import Email from "../value-objects/Email";
import FirstName from "../value-objects/FirstName";
import LastName from "../value-objects/LastName";
import MemberId from "../value-objects/MemberId";

export interface MemberProps {
  readonly id: MemberId;
  readonly email: Email;
  readonly lastName: LastName;
  readonly firstName: FirstName;
}

class Member {
  private constructor(private readonly props: MemberProps) {
  }

  public static register(props: MemberProps): Member {
    return new Member(props);
  }

  public static restore(props: MemberProps): Member {
    return new Member(props);
  }

  public getId(): MemberId {
    return this.props.id;
  }

  public getEmail(): Email {
    return this.props.email;
  }

  public getLastName(): LastName {
    return this.props.lastName;
  }

  public getFirstName(): FirstName {
    return this.props.firstName;
  }
}

export default Member;
