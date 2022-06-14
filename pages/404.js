import style from "../styles/404.module.css";
import Link from "next/link";
/*import { useRouter } from "next/router";
import { useEffect } from "react";*/

export default function NotFound() {
  /*const router = useRouter();
 useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, []);*/
  return (
    <div className={style.notFound}>
      <h1>Oups,</h1>
      <h2>Cette page est introuvable</h2>
      <p>
        Il est temps de revenir aux sources {""}
        <Link href="/dashboard">
          <a>Tableau de bord</a>
        </Link>
      </p>
    </div>
  );
}
