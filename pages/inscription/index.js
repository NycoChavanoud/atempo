import style from "./inscription.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import { set, ref } from "firebase/database";
import { db, auth } from "../../config/firebaseConfig";
import ChangeAvatar from "../../components/ChangeAvatar/ChangeAvatar";
import { BsPencil } from "react-icons/bs";

const Inscription = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let router = useRouter();
  const { createUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, firstName, lastName);
      const user = auth.currentUser;

      await set(ref(db, `practitioners/${user.uid}`), {
        lastname: lastName,
        firstname: firstName,
        id: user.uid,
        email,
      });

      router.push("/menu");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout pageTitle="Inscription" shape={true}>
      <h1 className={style.title}>Inscription</h1>
      <div className={style.userAvatar}>
        <ChangeAvatar className={style.avatar} />
        <BsPencil className={style.pencil} />
      </div>

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
