import { useState } from "react";
import style from "./ClientForm.module.css";
import createClient from "../../model/Clients/CreateClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [problematic, setProblematic] = useState("");
  const [adress, setAdress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createClient(firstname, lastname, email, phoneNumber, problematic, adress);

    toast("Client sauvegardé.", {
      theme: "dark",
      type: "success",
      position: "bottom-center",
    });
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhoneNumber("");
    setProblematic("");
    setAdress("");
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="prénom"> </label>
        <input
          data-cy="firstname"
          className={style.input}
          value={firstname}
          type="text"
          id="firstname"
          placeholder="Prénom"
          required
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label htmlFor="nom"> </label>
        <input
          data-cy="lastname"
          className={style.input}
          value={lastname}
          type="text"
          id="lastname"
          placeholder="Nom"
          required
          onChange={(e) => setLastname(e.target.value)}
        />

        <label htmlFor="email"> </label>
        <input
          data-cy="email"
          className={style.input}
          value={email}
          type="email"
          id="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="téléphone"> </label>
        <input
          className={style.input}
          value={phoneNumber}
          type="tel"
          id="phoneNumber"
          placeholder="Téléphone"
          required
          pattern="(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="probématique"> </label>
        <input
          data-cy="problematic"
          className={style.input}
          value={problematic}
          type="text"
          id="problematic"
          placeholder="Problématique"
          required
          onChange={(e) => setProblematic(e.target.value)}
        />

        <label htmlFor="adresse"> </label>
        <input
          className={style.input}
          value={adress}
          type="text"
          id="adress"
          placeholder="Adresse"
          onChange={(e) => setAdress(e.target.value)}
        />

        <button
          data-cy="submitBtn"
          id="btn"
          className={style.btn}
          type="submit"
        >
          Ajouter
        </button>
      </form>
      <ToastContainer autoClose={2000} />
    </>
  );
}
