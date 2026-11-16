import NewUser from "../entities/NewUser";
import User from "../entities/User";

interface UserRepositoryInterface {
  findById(id: number): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  /** @throws EmailAlreadyExistsError */
  create(user: NewUser): Promise<User>;
}

export default UserRepositoryInterface;
