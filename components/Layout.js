/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Head from "next/head";

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Accueil</a>
          </Link>
          <Link href="/dashboard">
            <a>Tableau de bord</a>
          </Link>
          <Link href="/clients">
            <a>Clients</a>
          </Link>
          <Link href="/sessions">
            <a>Séances</a>
          </Link>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </nav>
      </header>
      {children}
    </>
  );
}
