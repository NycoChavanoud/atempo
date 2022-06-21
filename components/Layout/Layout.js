import Head from "next/head";
import styles from "./Layout.module.css";

export default function Layout({ children, pageTitle, shape = false }) {
  return (
    <div className={`${shape ? styles.shape_layout : ""}`}>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>

      {children}
    </div>
  );
}
