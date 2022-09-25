export const formatDateTime = (dateTime: Date) => {
  const date = new Date(dateTime)
  return new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
