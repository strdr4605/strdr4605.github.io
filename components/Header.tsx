import Link from "next/link";
import AnimatedName from "./AnimatedName";
import GithubIcon from "./GithubIcon";
import styles from "./Header.module.css";
import RSSFeedIcon from "./RSSFeedIcon";

export default function Header() {
  return (
    <header className={styles.header}>
      <h3>
        <Link href="/">
          <a>
            <AnimatedName />
            &apos;s blog
          </a>
        </Link>
      </h3>
      <GithubIcon />
      <RSSFeedIcon />
      <nav className={styles.nav}>
        <p>
          <Link href="/Dragos-Strainu-Resume.pdf">Resume</Link>
          <Link href="/projects">Projects</Link>
        </p>
      </nav>
    </header>
  );
}
