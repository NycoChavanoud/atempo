import Link from "next/link";
import style from "./connexion.module.css";

export default function Connexion() {
  return (
    <>
      <div className={style.connexionContainer}></div>
      <h1 className={style.title}>Connectez-vous</h1>
      <div className={style.formContainer}>
        <form className={style.form}>
          <label htmlFor="email"></label>
          <input className={style.emailInput} type="email" name="" id="email" />
          <label htmlFor="pwd"></label>
          <input className={style.pwdInput} type="password" name="" id="pwd" />
          <button className={style.btnConnexion} type="submit">
            Connexion
          </button>
        </form>
      </div>

      <div className={style.links}>
        <Link href="#">
          <a className={style.link2inscription}>Pas encore inscrit ?</a>
        </Link>

        <Link href="#">
          <a className={style.link2forgotpwd}>Mot de passe oublié ?</a>
        </Link>
      </div>
    </>
  );
}
