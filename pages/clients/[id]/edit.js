import style from "../../../components/ClientForm/ClientForm.module.css";
import Layout from "../../../components/Layout/Layout";
import WhiteBurger from "../../../components/WhiteBurger/WhiteBurger";
import { getClientData, updateClient } from "../../../model/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditClient() {
  const [clientData, setClientData] = useState();
  const router = useRouter();
  const { id } = router.query;

  const handleChange = () => {
    updateClient(id, { ...clientData });
    router.push(`/clients/${id}`);
  };

  useEffect(() => {
    getClientData(id).then(setClientData);
  }, [id]);

  return (
    clientData && (
      <Layout shape pageTitle={"Modifier un client"}>
        <WhiteBurger />
        <h1>Modifier les informations</h1>
        <form>
          <label htmlFor="prénom"></label>
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
            pattern="(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}"
            required
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
            required
            onChange={(e) =>
              setClientData({
                ...clientData,
                adress: e.target.value,
              })
            }
          />
          <label htmlFor="thématique-select"> </label>{" "}
          <select
            className={style.input}
            id="thematic-select"
            name="thematic"
            value={clientData.thematic || ""}
            required
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
              placeholder={"Précisez ici"}
              value={clientData.other_thematic}
              onChange={(e) =>
                setClientData({ ...clientData, other_thematic: e.target.value })
              }
            />
          )}
          <label htmlFor="motif"> </label>
          <textarea
            className={style.motif}
            id="motif"
            placeholder="Motif(s)"
            required
            onChange={(e) =>
              setClientData({ ...clientData, motif: e.target.value })
            }
          />
          <button
            style={{
              width: "150px",
              height: "50px",
              background: "var(--color1",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bolder",
              fontSize: "1.5em",
            }}
            onClick={handleChange}
          >
            Soumettre
          </button>
        </form>
      </Layout>
    )
  );
}
