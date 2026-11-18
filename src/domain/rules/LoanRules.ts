const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const MAX_ACTIVE_LOANS = 3;

export const LOAN_DURATION_DAYS = 14;

export function hasReachedActiveLoanLimit(activeLoanCount: number): boolean {
  return activeLoanCount >= MAX_ACTIVE_LOANS;
}

export function computeDueDate(borrowedAt: Date): Date {
  const dueAt = new Date(borrowedAt.getTime());
  dueAt.setUTCDate(dueAt.getUTCDate() + LOAN_DURATION_DAYS);

  return dueAt;
}

function utcCalendarDayIndex(date: Date): number {
  return Math.floor(date.getTime() / MILLISECONDS_PER_DAY);
}

export function countLateCalendarDays(dueAt: Date, returnedAt: Date): number {
  return Math.max(0, utcCalendarDayIndex(returnedAt) - utcCalendarDayIndex(dueAt));
}
