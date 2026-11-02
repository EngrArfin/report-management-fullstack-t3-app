/**
 * Deadline Service for Office Manager Weekly Reporting
 * 
 * Business Rule (#6):
 * OM can submit any day of the week.
 * Final deadline for each week is Friday 11:59:59 PM.
 * If submitted after Friday 11:59:59 PM, it is identified as Late Submitted.
 * If not submitted after Friday 11:59:59 PM, it is identified as Pending / Overdue.
 */

/**
 * Returns the Date of the Nth Friday of a given year and month (1-indexed month)
 * at 23:59:59 (11:59 PM).
 */
export function getFridayDeadline(year: number, month: number, week: number): Date {
  // Month in JS Date is 0-indexed (0 = Jan, 8 = Sep)
  const jsMonth = month - 1;
  const fridays: Date[] = [];

  // Find all Fridays in this month
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, jsMonth, day, 23, 59, 59, 999);
    // Friday is day 5 in getDay() (0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat)
    if (d.getDay() === 5) {
      fridays.push(d);
    }
  }

  // Week 1 -> 1st Friday, Week 2 -> 2nd Friday, Week 3 -> 3rd Friday, Week 4 -> 4th Friday
  const index = Math.min(week - 1, fridays.length - 1);
  const friday = fridays[index];
  if (friday) {
    return friday;
  }

  // Fallback: standard 7-day offset if month has irregular day start
  return new Date(year, jsMonth, week * 7, 23, 59, 59, 999);
}

/**
 * Check if a submission time is after the deadline
 */
export function isLateSubmission(submissionTime: Date, deadline: Date): boolean {
  return submissionTime.getTime() > deadline.getTime();
}

/**
 * Check if the deadline has passed relative to now
 */
export function isDeadlinePassed(deadline: Date): boolean {
  return Date.now() > deadline.getTime();
}

/**
 * Helper to get Month display string
 */
export function formatMonthYear(year: number, month: number): string {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${monthNames[month - 1]} ${year}`;
}
