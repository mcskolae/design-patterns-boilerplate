import User from "../../domain/entities/User";
import NewUser from "../../domain/entities/NewUser";
import EmailAlreadyExistsError from "../../domain/errors/EmailAlreadyExistsError";
import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";

export interface RegisterUserInput {
  email: string;
  lastName: string;
  firstName: string;
}

class RegisterUser {
  public constructor(private readonly userRepository: UserRepositoryInterface) {
  }

  /**
   * @throws InvalidEmailError
   * @throws InvalidLastNameError
   * @throws InvalidFirstNameError
   * @throws EmailAlreadyExistsError
   */
  public async execute(input: RegisterUserInput): Promise<User> {
    const newUser = NewUser.new(input.email, input.lastName, input.firstName);

    const existing = await this.userRepository.findByEmail(newUser.getEmail());
    if (existing !== null) {
      throw new EmailAlreadyExistsError();
    }

    return this.userRepository.create(newUser);
  }
}

export default RegisterUser;
