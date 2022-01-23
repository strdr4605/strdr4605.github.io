import { formatDate } from "../lib/utils";

export default function Date({ date }: { date: Date }) {
  return (
    <i>
      <time datatype={date.toISOString().split("T")[0]}>
        {formatDate(date)}
      </time>
    </i>
  );
}
