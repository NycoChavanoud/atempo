import style from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

export default function Layout({
  children,
  pageTitle,
  menu,
  page,
  nude,
  purple,
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <header>
        {page && (
          <div className={style.waveBackground}>
            <Link href="/menu">
              <img
                className={style.whiteBurger}
                src="/images/grey_burger.svg"
              />
            </Link>
          </div>
        )}
        {menu && (
          <div className={style.waveBackground}>
            <Link href="/menu">
              <img
                onClick={() => Router.back()}
                className={style.cross}
                src="/images/X.png"
              />
            </Link>
          </div>
        )}
        {nude && (
          <Link href="/menu">
            <img className={style.blackBurger} src="/images/grey_burger.svg" />
          </Link>
        )}
        {purple && (
          <div className={style.purple}>
            <Link href="/menu">
              <img
                className={style.whiteBurger}
                src="/images/grey_burger.svg"
              />
            </Link>
          </div>
        )}
      </header>
      {children}
    </>
  );
}
