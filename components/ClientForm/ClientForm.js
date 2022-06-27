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
        name="firstname"
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
        name="lastname"
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
        name="email"
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
        name="phoneNumber"
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
        name="adress"
        placeholder="Adresse"
        required
        onChange={(e) =>
          setClientData({
            ...clientData,
            adress: e.target.value,
          })
        }
      />

      <label htmlFor="thématique"> </label>
      <select
        className={style.input}
        type="text"
        id="thematic"
        name="thematic"
        placeholder="Thématique"
        required
        onChange={(e) =>
          setClientData({
            ...clientData,
            thematic: e.target.value,
          })
        }
      >
        {" "}
        <option value="">--Choisissez un thème--</option>
        <option value="decouverte">Découverte</option>
        <option value="sommeil">Sommeil</option>
        <option value="energie">Energie</option>
        <option value="grossesse">Grossesse</option>
        <option value="stress">Stress</option>
        <option value="enfants">Enfant</option>
        <option value="emotion">Emotion</option>
        <option value="mental">Mental</option>
        <option value="autre">Autre</option>
      </select>
      {clientData.thematic === "autre" && (
        <input
          className={style.input}
          type="text"
          id="other_thematic"
          name="other_thematic"
          placeholder="Précisez ici"
          required
          onChange={(e) =>
            setClientData({ ...clientData, other_thematic: e.target.value })
          }
        />
      )}
    </form>
  );
}
