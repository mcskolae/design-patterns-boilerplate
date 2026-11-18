import Member from "../../domain/entities/Member";
import EmailAlreadyExistsError from "../../domain/errors/EmailAlreadyExistsError";
import MemberRepositoryInterface from "../../domain/repositories/MemberRepositoryInterface";
import Email from "../../domain/value-objects/Email";
import FirstName from "../../domain/value-objects/FirstName";
import LastName from "../../domain/value-objects/LastName";
import { MemberDto, toMemberDto } from "../dto/MemberDto";
import { RegisterMemberCommand, RegisterMemberUseCase } from "../ports/in/RegisterMemberUseCase";
import UnitOfWorkInterface from "../ports/out/UnitOfWorkInterface";

class RegisterMember implements RegisterMemberUseCase {
  public constructor(
    private readonly memberRepository: MemberRepositoryInterface,
    private readonly unitOfWork: UnitOfWorkInterface,
  ) {
  }

  public async execute(command: RegisterMemberCommand): Promise<MemberDto> {
    const email = Email.from(command.email);
    const lastName = LastName.from(command.lastName);
    const firstName = FirstName.from(command.firstName);

    return this.unitOfWork.run(async () => {
      if (await this.memberRepository.findByEmail(email) !== null) {
        throw new EmailAlreadyExistsError(email);
      }

      const member = Member.register({
        id: await this.memberRepository.nextIdentity(),
        email,
        lastName,
        firstName,
      });

      await this.memberRepository.save(member);

      return toMemberDto(member);
    });
  }
}

export default RegisterMember;
