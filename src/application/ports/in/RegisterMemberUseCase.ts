import { MemberDto } from "../../dto/MemberDto";

export interface RegisterMemberCommand {
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
}

export interface RegisterMemberUseCase {
  /**
   * @throws InvalidEmailError
   * @throws InvalidLastNameError
   * @throws InvalidFirstNameError
   * @throws EmailAlreadyExistsError
   */
  execute(command: RegisterMemberCommand): Promise<MemberDto>;
}
