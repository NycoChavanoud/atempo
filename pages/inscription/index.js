import style from "./inscription.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import Layout from "../../components/Layout/Layout";

const Inscription = () => {
  const [lastName, SetLastName] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let router = useRouter();
  const { createUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      router.push("/dashboard");
    } catch (error) {
      setError("erreur");
    }
  };

  return (
    <Layout pageTitle="Inscription">
      <div className={style.purple}>
        <h1 className={style.title}>Inscription</h1>
        <Avatar
          className={style.user}
          alt="votre photo"
          sx={{ width: 100, height: 100 }}
        />

        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="firstName"></label>
            <input
              style={{ opacity: 0.5 }}
              className={style.emailInput}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => SetFirstName(e.target.value)}
            />

            <label htmlFor="lastName"></label>
            <input
              style={{ opacity: 0.5 }}
              className={style.emailInput}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => SetLastName(e.target.value)}
            />

            <label htmlFor="email"></label>
            <input
              className={style.emailInput}
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="pwd"></label>
            <input
              className={style.pwdInput}
              type="password"
              name="password"
              id="pwd"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button className={style.btnInscription} type="submit">
              Inscription
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Inscription;
