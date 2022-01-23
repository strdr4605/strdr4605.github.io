import Link from "next/link";
import styles from "./Header.module.css";
import RSSFeedIcon from "./RSSFeedIcon";

export default function Header() {
  return (
    <header className={styles.header}>
      <h3>
        <Link href="/">Dragoș Străinu&apos;s blog</Link>
      </h3>
      <RSSFeedIcon />
    </header>
  );
}
