import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../../context/authContext";

export default function LayoutSecure({ children, pageTitle }) {
  const { user } = useAuth();
  if (user === user) {
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
  } else {
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <Link href="/inscription">
        <a></a>
      </Link>
    </>;
  }
}
