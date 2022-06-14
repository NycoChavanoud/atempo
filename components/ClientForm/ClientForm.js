import { useState } from "react";
import style from "./ClientForm.module.css";

export default function ClientForm() {
  const [firstname, setFirstname] = useState("Prénom");
  const [lastname, setLastname] = useState("Nom");
  const [email, setEmail] = useState("Email");
  const [phoneNumber, setPhoneNumber] = useState("Numéro de téléphone");
  const [problematic, setProblematic] = useState("Problématique");
  const [adress, setAdress] = useState("Adresse");

  const handleFirstname = (e) => setFirstname(e.target.value);
  const handleLastname = (e) => setLastname(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleProblematic = (e) => setProblematic(e.target.value);
  const handleAdress = (e) => setAdress(e.target.value);

  return (
    <form className={style.form}>
      <label htmlFor="prénom">
        <input
          className={style.input}
          type="text"
          id="firstname"
          placeholder={firstname}
          required
          onChange={handleFirstname}
        />
      </label>
      <label htmlFor="nom">
        <input
          className={style.input}
          type="text"
          id="lastname"
          placeholder={lastname}
          required
          onChange={handleLastname}
        />
      </label>
      <label htmlFor="email">
        <input
          className={style.input}
          type="email"
          id="email"
          placeholder={email}
          required
          onChange={handleEmail}
        />
      </label>
      <label htmlFor="téléphone">
        <input
          className={style.input}
          type="number"
          id="phoneNumber"
          placeholder={phoneNumber}
          onChange={handlePhoneNumber}
        />
      </label>
      <label htmlFor="probématique">
        <input
          className={style.input}
          type="text"
          id="problematic"
          placeholder={problematic}
          required
          onChange={handleProblematic}
        />
      </label>
      <label htmlFor="adresse">
        <input
          className={style.input}
          type="text"
          id="adress"
          placeholder={adress}
          onChange={handleAdress}
        />
      </label>

      <button className={style.btn} type="submit">
        Ajouter
      </button>
    </form>
  );
}
