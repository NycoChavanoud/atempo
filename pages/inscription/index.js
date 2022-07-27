import style from "./inscription.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import { set, ref } from "firebase/database";
import { db, auth } from "../../config/firebaseConfig";
import { updateProfile } from "firebase/auth";

const Inscription = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const defaultURL =
    "https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg";

  let router = useRouter();
  const { createUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      const user = auth.currentUser;

      await set(ref(db, `practitioners/${user.uid}`), {
        lastname: lastName,
        firstname: firstName,
        id: user.uid,
        seance_nb: 0,
        client_nb: 0,
        photoURL: defaultURL,
        email,
      });

      await updateProfile(user, { photoURL: defaultURL });

      router.push("/profile");
    } catch (error) {
      setError(
        "Une erreur est survenue, merci de vérifier vos informations de connexion"
      );
    }
  };

  return (
    <Layout pageTitle="Inscription" shape={true}>
      <h1 className={style.title}>Inscription</h1>

      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="firstName"></label>
          <input
            className={style.inscriptionInput}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Prénom"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName"></label>
          <input
            className={style.inscriptionInput}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Nom"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email"></label>
          <input
            className={style.inscriptionInput}
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pwd"></label>
          <input
            className={style.inscriptionInput}
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
    </Layout>
  );
};

export default Inscription;
