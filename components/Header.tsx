import Link from "next/link";
import RSSFeedIcon from "./RSSFeedIcon";

export default function Header() {
  return (
    <header>
      <h3>
        <Link href="/">Dragoș Străinu&apos;s blog</Link>
      </h3>
      <Link href="/feed/rss.xml">
        <a>
          <RSSFeedIcon />
        </a>
      </Link>
    </header>
  );
}
