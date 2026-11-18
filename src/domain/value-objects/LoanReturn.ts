import { countLateCalendarDays } from "../rules/LoanRules";

class LoanReturn {
  private constructor(
    private readonly returnedAt: Date,
    private readonly lateDays: number,
  ) {
  }

  public static record(returnedAt: Date, dueAt: Date): LoanReturn {
    return new LoanReturn(new Date(returnedAt.getTime()), countLateCalendarDays(dueAt, returnedAt));
  }

  public static restore(returnedAt: Date, lateDays: number): LoanReturn {
    return new LoanReturn(new Date(returnedAt.getTime()), lateDays);
  }

  public getReturnedAt(): Date {
    return new Date(this.returnedAt.getTime());
  }

  public getLateDays(): number {
    return this.lateDays;
  }

  public isLate(): boolean {
    return this.lateDays > 0;
  }
}

export default LoanReturn;
