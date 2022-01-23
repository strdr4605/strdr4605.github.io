import React from "react";
import Header from "./Header";
import styles from "./Layout.module.css";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
