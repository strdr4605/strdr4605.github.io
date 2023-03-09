import { parse } from "@vanillaes/csv";
import Link from "next/link";
import { useEffect, useState } from "react";
import DateComponent from "../components/Date";

const gistUrl =
  "https://gist.githubusercontent.com/strdr4605/f096d7efba21377d79e4422ba15a0c63/raw/data.csv";

const TodayIRead = () => {
  const [todayIRead, setTodayIRead] = useState<
    Partial<{ date: string; url: string; title: string; referrer: string }>[]
  >([]);

  useEffect(() => {
    fetch(gistUrl)
      .then((response) => response.text())
      .then((data) => {
        const lines = parse(data);
        const headers = lines[0];
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          const obj: Record<string, any> = {};
          const currentline = lines[i];
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }

        // reverse array so that latest articles are first
        setTodayIRead(result.reverse());
      });
  }, []);

  return (
    <>
      <h1>Today I read</h1>
      <ul>
        {todayIRead.map((item) => {
          if (!item.date || !item.title || !item.url) {
            return null;
          }

          return (
            <li
              key={item.title}
              style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}
            >
              <span>
                <DateComponent date={item.date} />
              </span>
              <Link href={item.url}>
                <a>{item.title}</a>
              </Link>
              {item.referrer && <sub> {item.referrer}</sub>}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodayIRead;
