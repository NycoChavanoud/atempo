import style from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

export default function Layout({ children, pageTitle, menu, page }) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <header className={style.background}>
        {!menu && (
          <Link href="/menu">
            <img className={style.burger} src="/images/grey_burger.svg" />
          </Link>
        )}
        {!page && (
          <Link href="/menu">
            <img
              onClick={() => Router.back()}
              className={style.cross}
              src="/images/X.png"
            />
          </Link>
        )}
      </header>
      {children}
    </>
  );
}
