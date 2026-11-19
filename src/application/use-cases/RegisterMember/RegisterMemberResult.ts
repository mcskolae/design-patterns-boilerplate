import { Member } from "../../../domain/entities/Member";

export interface RegisterMemberResult {
  readonly id: number;
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
}

export function toRegisterMemberResult(member: Member): RegisterMemberResult {
  return {
    id: member.getId().toNumber(),
    email: member.getEmail().toString(),
    lastName: member.getLastName(),
    firstName: member.getFirstName(),
  };
}
