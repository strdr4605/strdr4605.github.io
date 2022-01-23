import Link from "next/link";
import styles from "./RSSFeedIcon.module.css";

export default function RSSFeedIcon() {
  return (
    <Link href="/feed/rss.xml">
      <a className={styles.icon}>
        <svg
          width="1.5rem"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title id="rss-title">RSS Feed</title>
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="1"></circle>
        </svg>
      </a>
    </Link>
  );
}
