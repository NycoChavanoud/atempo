import Link from "next/link";
import style from "../styles/connexion.module.css";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Wave from "../components/Wave/Wave";
import { GoogleButton } from "react-google-button";

const Connexion = () => {
  const { signIn, googleSignIn, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      router.push("/menu");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user != null) {
      router.push("/menu");
    }
  }, [router, user]);

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

            <GoogleButton
              className={style.googleBtn}
              onClick={handleGoogleSignIn}
            />

            {error && <p>{error}</p>}

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
            <a className={style.link}>Pas encore inscrit ?</a>
          </Link>

          <Link href="/resetpwd">
            <a className={style.link}>Mot de passe oublié ?</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Connexion;
