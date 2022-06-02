import Head from "next/head";
import Link from "next/link";
import BurgerButton from "../BurgerButton/BurgerButton";
import styles from "./Layout.module.css";

export default function Layout({
  children,
  pageTitle,
  wave = false,
  shape = false,
}) {
  return (
    <div
      className={`${wave ? styles.wave_layout : styles.layout} ${
        shape ? styles.shape_layout : null
      }`}
    >
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <BurgerButton black={wave || shape ? false : true} />
        </Link>
      </header>
      {children}
    </div>
  );
}
