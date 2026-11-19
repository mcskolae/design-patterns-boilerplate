import { Member } from "../entities/Member";
import { Email } from "../value-objects/Email";
import { MemberId } from "../value-objects/MemberId";

export interface MemberRepositoryInterface {
  nextIdentity(): Promise<MemberId>;

  findById(id: MemberId): Promise<Member | null>;

  findByEmail(email: Email): Promise<Member | null>;

  /** @throws EmailAlreadyExistsError */
  save(member: Member): Promise<void>;
}
