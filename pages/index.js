import Link from "next/link";
import style from "../styles/connexion.module.css";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useRouter } from "next/router";

const Connexion = () => {
  const { signin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signin(email, password);
      router.push("/account");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className={style.connexionContainer}></div>
      <h1 className={style.title}>Connectez-vous</h1>

      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input
            className={style.emailInput}
            type="email"
            name=""
            id="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pwd"></label>
          <input
            className={style.pwdInput}
            type="password"
            name=""
            id="pwd"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? error.message : null}

          <button className={style.btnConnexion} type="submit">
            Connexion
          </button>
        </form>
      </div>

      <div className={style.links}>
        <Link href="/inscription">
          <a className={style.link2inscription}>Pas encore inscrit ?</a>
        </Link>

        <Link href="/resetpwd">
          <a className={style.link2forgotpwd}>Mot de passe oublié ?</a>
        </Link>
      </div>
    </>
  );
};

export default Connexion;
