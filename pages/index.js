import Link from "next/link";
import style from "../styles/connexion.module.css";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Wave from "../components/Wave/Wave";

const Connexion = () => {
  const { signIn, googleSignInMobile, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      router.push("/profile");
    } catch (error) {
      setError(
        "Une erreur est survenue, merci de vérifier vos informations de connexion"
      );
    }
  };

  const handleGoogleSignInMobile = async () => {
    try {
      await googleSignInMobile();
    } catch (error) {
      setError("Les informations renseignées semblent incorrectes");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/profile");
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pwd"></label>
            <input
              data-cy="password"
              className={style.pwdInput}
              type="password"
              name="password"
              id="pwd"
              placeholder="Votre mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button
              data-cy="signInButton"
              className={style.btnConnexion}
              type="submit"
            >
              Connexion
            </button>

            <button
              data-cy="google"
              type="button"
              className={style.googleBtn}
              onClick={handleGoogleSignInMobile}
            >
              Connectez vous avec Google
            </button>
          </form>
          <div className={style.links}>
            <Link href="/inscription">
              <a className={style.link}>Pas encore inscrit ?</a>
            </Link>

            <Link href="/resetpwd">
              <a className={style.link}>Mot de passe oublié ?</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Connexion;
