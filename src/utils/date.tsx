import { format } from "date-fns";

const formatReadableDate = (date?: Date) => {
  if (!date) return "";
  return format(date, "MMMM-dd-yyyy hh:mm a");
};
function formatTime(date: string): string {
  return format(date, "hh:mm aa");
}
export { formatReadableDate, formatTime };
