import React, { useContext } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";
import Link from "next/link";

export default function ClientForm() {
  const { clientData, setClientData } = useContext(createClientContext);

  return (
    <form className={style.form}>
      <label htmlFor="prénom"> </label>
      <input
        data-cy="firstname"
        className={style.input}
        type="text"
        id="firstname"
        placeholder="Prénom"
        required
        onChange={(e) =>
          setClientData({
            ...clientData,
            firstname: e.target.value,
          })
        }
      />

      <label htmlFor="nom"> </label>
      <input
        data-cy="lastname"
        className={style.input}
        type="text"
        id="lastname"
        placeholder="Nom"
        required
        onChange={(e) =>
          setClientData({
            ...clientData,
            lastname: e.target.value,
          })
        }
      />

      <label htmlFor="email"> </label>
      <input
        data-cy="email"
        className={style.input}
        type="email"
        id="email"
        placeholder="email"
        required
        onChange={(e) =>
          setClientData({
            ...clientData,
            email: e.target.value,
          })
        }
      />

      <label htmlFor="téléphone"> </label>
      <input
        className={style.input}
        type="tel"
        id="phoneNumber"
        placeholder="Téléphone"
        required
        pattern="(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}"
        onChange={(e) =>
          setClientData({
            ...clientData,
            phoneNumber: e.target.value,
          })
        }
      />

      <label htmlFor="adresse"> </label>
      <input
        className={style.input}
        type="text"
        id="adress"
        placeholder="Adresse"
        onChange={(e) =>
          setClientData({
            ...clientData,
            adress: e.target.value,
          })
        }
      />
      <Link href="/clients/addProblematic">
        <button data-cy="nextBtn" id="btn" className={style.btn}>
          Suivant
        </button>
      </Link>
    </form>
  );
}
