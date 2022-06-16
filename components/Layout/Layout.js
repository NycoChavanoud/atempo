import Head from "next/head";

export default function Layout({ children, pageTitle }) {
  // const

  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      {children}
    </>
  );
}
