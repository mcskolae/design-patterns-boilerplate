import { Member } from "../../domain/entities/Member";

export interface MemberDto {
  readonly id: number;
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
}

export function toMemberDto(member: Member): MemberDto {
  return {
    id: member.getId().toNumber(),
    email: member.getEmail().toString(),
    lastName: member.getLastName(),
    firstName: member.getFirstName(),
  };
}
