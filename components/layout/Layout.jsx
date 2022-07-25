import React, { Fragment } from "react";
import NavigationBar from "./NavigationBar";
import FooterBar from "./Footer";
import styles from "./Layout.module.css";

export default function Layout(props) {
  return (
    <Fragment>
      <NavigationBar />
      <main className={styles.main}>{props.children}</main>
      <footer className={styles.footer}>
        <FooterBar />
      </footer>
    </Fragment>
  );
}
