import { formatDate } from "../lib/utils";

export default function DateComponent({ date }: { date: Date | string }) {
  return (
    <i>
      <time dateTime={new Date(date).toISOString().split("T")[0]}>
        {formatDate(new Date(date))}
      </time>
    </i>
  );
}
