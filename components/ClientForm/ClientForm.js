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
        <label htmlFor="prénom">
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
        </label>
        <label htmlFor="nom">
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
        </label>
        <label htmlFor="email">
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
        </label>
        <label htmlFor="téléphone">
          <input
            className={style.input}
            value={phoneNumber}
            type="number"
            id="phoneNumber"
            placeholder="Téléphone"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label htmlFor="probématique">
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
        </label>
        <label htmlFor="adresse">
          <input
            className={style.input}
            value={adress}
            type="text"
            id="adress"
            placeholder="Adresse"
            onChange={(e) => setAdress(e.target.value)}
          />
        </label>

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
