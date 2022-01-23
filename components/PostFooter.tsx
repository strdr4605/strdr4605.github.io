import styles from "./PostFooter.module.css";
export default function PostFooter() {
  return (
    <footer className={styles.footer}>
      Liked this post? Follow me{" "}
      <a target="_blank" href="http://twitter.com/strdr4605" rel="noreferrer">
        @strdr4605
      </a>{" "}
      to get more updates.
    </footer>
  );
}
