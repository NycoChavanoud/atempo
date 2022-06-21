import React, { useContext } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";

export default function ClientForm() {
  const { clientData, setClientData } = useContext(createClientContext);

  return (
    <form className={style.form}>
      <label htmlFor="prénom"> </label>
      <input
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
    </form>
  );
}
