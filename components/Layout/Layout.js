import Head from "next/head";
import Link from "next/link";
import BurgerButton from "../BurgerButton/BurgerButton";
import styles from "./Layout.module.css";

export default function Layout({ children, pageTitle, wave = false }) {
  return (
    <div className={wave ? styles.wave_layout : styles.layout}>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <Link href="/">
        <BurgerButton />
      </Link>
      {children}
    </div>
  );
}
