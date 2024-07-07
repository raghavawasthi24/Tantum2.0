export function timeDifference(start: string, end: string): string {
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;

  // If end time is earlier in the day than start time, it means the period spans midnight
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60; // add 24 hours in minutes
  }

  const diffMinutes = endTotalMinutes - startTotalMinutes;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}hr ${minutes}min`;
}

console.log(timeDifference("23:00", "18:59")); // "19hr 59min"
