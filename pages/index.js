import Link from "next/link";
import style from "../styles/connexion.module.css";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Wave from "../components/Wave/Wave";

const Connexion = () => {
  const { signin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signin(email, password);
      router.push("/account");
    } catch (error) {
      alert("Merci de vérifier vos des données ou inscrivez-vous");
    }
  };

  return (
    <Layout pageTitle="Connexion">
      <div className={style.container}>
        <Wave />
        <h1 className={style.title}>Connectez-vous</h1>

        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input
              data-cy="email"
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
              data-cy="password"
              className={style.pwdInput}
              type="password"
              name=""
              id="pwd"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              data-cy="signInButton"
              className={style.btnConnexion}
              type="submit"
            >
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
      </div>
    </Layout>
  );
};

export default Connexion;
