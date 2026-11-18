import Member from "../../../domain/entities/Member";
import EmailAlreadyExistsError from "../../../domain/errors/EmailAlreadyExistsError";
import MemberRepositoryInterface from "../../../domain/repositories/MemberRepositoryInterface";
import Email from "../../../domain/value-objects/Email";
import FirstName from "../../../domain/value-objects/FirstName";
import LastName from "../../../domain/value-objects/LastName";
import MemberId from "../../../domain/value-objects/MemberId";

interface MemberRecord {
  readonly id: number;
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
}

class InMemoryMemberRepository implements MemberRepositoryInterface {
  private readonly records = new Map<number, MemberRecord>();
  private lastId = 0;

  public async nextIdentity(): Promise<MemberId> {
    this.lastId += 1;

    return MemberId.from(this.lastId);
  }

  public async findById(id: MemberId): Promise<Member | null> {
    const record = this.records.get(id.toNumber());

    return record === undefined ? null : InMemoryMemberRepository.toDomain(record);
  }

  public async findByEmail(email: Email): Promise<Member | null> {
    for (const record of this.records.values()) {
      if (record.email === email.toString()) {
        return InMemoryMemberRepository.toDomain(record);
      }
    }

    return null;
  }

  public async save(member: Member): Promise<void> {
    const record = InMemoryMemberRepository.toRecord(member);

    for (const other of this.records.values()) {
      if (other.id !== record.id && other.email === record.email) {
        throw new EmailAlreadyExistsError(member.getEmail());
      }
    }

    this.records.set(record.id, record);
  }

  private static toDomain(record: MemberRecord): Member {
    return Member.restore({
      id: MemberId.from(record.id),
      email: Email.from(record.email),
      lastName: LastName.from(record.lastName),
      firstName: FirstName.from(record.firstName),
    });
  }

  private static toRecord(member: Member): MemberRecord {
    return {
      id: member.getId().toNumber(),
      email: member.getEmail().toString(),
      lastName: member.getLastName().toString(),
      firstName: member.getFirstName().toString(),
    };
  }
}

export default InMemoryMemberRepository;
