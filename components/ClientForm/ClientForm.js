/* eslint-disable no-useless-escape */
import { useContext, useEffect } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";

export default function ClientForm() {
  const { clientData, setClientData, setValidation } =
    useContext(createClientContext);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

  useEffect(() => {
    if (
      clientData.firstname &&
      clientData.lastname &&
      clientData.email?.match(emailRegex) &&
      clientData.phoneNumber?.match(phoneRegex) &&
      clientData.streetNumber?.length >= 1 &&
      clientData.streetName?.length >= 5 &&
      clientData.postalCode?.length === 5 &&
      clientData.city?.length >= 1
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [clientData, setValidation]);

  return (
    <form className={style.form}>
      <label htmlFor="prénom"> </label>
      <input
        className={style.input}
        type="text"
        id="firstname"
        placeholder="Prénom"
        value={clientData.firstname || ""}
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
        value={clientData.lastname || ""}
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
        value={clientData.email || ""}
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
        value={clientData.phoneNumber || ""}
        onChange={(e) =>
          setClientData({
            ...clientData,
            phoneNumber: e.target.value,
          })
        }
      />
      <div style={{ display: "flex" }}>
        <label htmlFor="numéro de voie"> </label>
        <input
          className={`${style.streetInput} ${"mr-5"}`}
          type="number"
          min={0}
          id="streetNumber"
          placeholder="n°"
          value={clientData.streetNumber || ""}
          onChange={(e) =>
            setClientData({
              ...clientData,
              streetNumber: e.target.value,
            })
          }
        />
        <label htmlFor="nom de la voie"> </label>
        <input
          className={style.input}
          type="text"
          id="streetName"
          placeholder="Nom de la voie"
          value={clientData.streetName || ""}
          onChange={(e) =>
            setClientData({
              ...clientData,
              streetName: e.target.value,
            })
          }
        />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <label htmlFor="code postal"> </label>
        <input
          className={`${style.codeInput} ${"mr-5"}`}
          type="number"
          min={0}
          id="postalCode"
          placeholder="code postal"
          value={clientData.postalCode || ""}
          onChange={(e) =>
            setClientData({
              ...clientData,
              postalCode: e.target.value,
            })
          }
        />
        <label htmlFor="ville"> </label>
        <input
          className={style.codeInput}
          type="text"
          id="city"
          placeholder="Ville"
          value={clientData.city || ""}
          onChange={(e) =>
            setClientData({
              ...clientData,
              city: e.target.value,
            })
          }
        />
      </div>
      <label htmlFor="thématique-select"> </label>{" "}
      <select
        className={style.input}
        id="thematic-select"
        name="thematic"
        value={clientData.thematic || ""}
        onChange={(e) =>
          setClientData({
            ...clientData,
            thematic: e.target.value,
          })
        }
      >
        <option value="">--Choisissez un thème--</option>
        <option value="decouverte">Découverte</option>
        <option value="sommeil">Sommeil</option>
        <option value="energie">Energie</option>
        <option value="grossesse">Grossesse</option>
        <option value="stress">Stress</option>
        <option value="enfants">Enfants</option>
        <option value="emotion">Emotion</option>
        <option value="mental">Mental</option>
        <option value="autre">Précisez</option>
      </select>
      {clientData.thematic === "autre" && (
        <input
          className={style.input}
          type="text"
          id="other_thematic"
          placeholder={"Précisez ici"}
          value={clientData.other_thematic || ""}
          onChange={(e) =>
            setClientData({ ...clientData, other_thematic: e.target.value })
          }
        />
      )}
    </form>
  );
}
