export function formatDate(date: Date): string {
  const formattedDate = date.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}
