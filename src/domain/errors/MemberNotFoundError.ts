import MemberId from "../value-objects/MemberId";
import DomainError from "./DomainError";

class MemberNotFoundError extends DomainError {
  public constructor(public readonly memberId: MemberId) {
    super(`Member ${memberId.toString()} not found.`);
  }
}

export default MemberNotFoundError;
