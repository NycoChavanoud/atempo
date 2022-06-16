import style from "../styles/404.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  });
  return (
    <div className={style.notFound}>
      <h1 className={style.title}>Oups,</h1>
      <h2 className={style.title}>Cette page est introuvable</h2>
      <p className={style.text}>Il est temps de revenir aux sources</p>
    </div>
  );
}
