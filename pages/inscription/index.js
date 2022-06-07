import style from "./inscription.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

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
      router.push("/account");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className={style.inscriptionContainer}>
        <h1 className={style.title}>Inscription</h1>

        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label className={style.label} htmlFor="firstName"></label>
            <input
              className={style.emailInput}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => SetFirstName(e.target.value)}
            />

            <label className={style.label} htmlFor="lastName"></label>
            <input
              className={style.emailInput}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => SetLastName(e.target.value)}
            />

            <label className={style.label} htmlFor="email"></label>
            <input
              className={style.emailInput}
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className={style.label} htmlFor="pwd"></label>
            <input
              className={style.pwdInput}
              type="password"
              name="password"
              id="pwd"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error ? error.message : null}

            <button className={style.btnInscription} type="submit">
              Inscription
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Inscription;
