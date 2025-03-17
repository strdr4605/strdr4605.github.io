import React from "react";
import Header from "./Header";
import styles from "./Layout.module.css";

export default function Layout({
  children,
  hideHeader,
}: React.PropsWithChildren<{ hideHeader?: boolean }>) {
  return (
    <div className={styles.container}>
      {!hideHeader && <Header />}
      {children}
    </div>
  );
}
