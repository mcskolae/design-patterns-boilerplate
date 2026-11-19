import { Member } from "../../../domain/entities/Member";
import { EmailAlreadyExistsError } from "../../../domain/errors/EmailAlreadyExistsError";
import { MemberRepositoryInterface } from "../../../domain/repositories/MemberRepositoryInterface";
import { Email } from "../../../domain/value-objects/Email";
import { RegisterMemberCommand } from "./RegisterMemberCommand";
import { RegisterMemberResult, toRegisterMemberResult } from "./RegisterMemberResult";

export class RegisterMember {
  public constructor(
    private readonly memberRepository: MemberRepositoryInterface,
  ) {
  }

  /**
   * @throws InvalidEmailError
   * @throws EmailAlreadyExistsError
   * @throws InvalidLastNameError
   * @throws InvalidFirstNameError
   */
  public async execute(command: RegisterMemberCommand): Promise<RegisterMemberResult> {
    const email = Email.from(command.email);

    if (await this.memberRepository.findByEmail(email) !== null) {
      throw new EmailAlreadyExistsError(email);
    }

    const member = Member.register({
      id: await this.memberRepository.nextIdentity(),
      email,
      lastName: command.lastName,
      firstName: command.firstName,
    });

    await this.memberRepository.save(member);

    return toRegisterMemberResult(member);
  }
}
