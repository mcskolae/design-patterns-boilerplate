import NewUser from "../entities/NewUser";
import User from "../entities/User";

interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;

  /** @throws EmailAlreadyExistsError */
  create(user: NewUser): Promise<User>;
}

export default UserRepositoryInterface;
