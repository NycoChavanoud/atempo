import React, { useContext } from "react";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function MainDataForm() {
  const { seanceData, setSeanceData } = useContext(createSeanceContext);

  return (
    <form className={styles.MainDataContainer}>
      <label className={styles.create_label} htmlFor="titre">
        {" "}
        <input
          className={styles.create_input_title}
          type="text"
          id="title"
          placeholder="Titre de la séance"
          required
          onChange={(e) =>
            setSeanceData({
              ...seanceData,
              title: e.target.value,
            })
          }
        />
      </label>
      <label className={styles.create_label} htmlFor="method-select" required>
        {" "}
        <select
          className={styles.select}
          name="method"
          id="method-select"
          required
          onChange={(e) =>
            setSeanceData({ ...seanceData, method: e.target.value })
          }
        >
          <option value="">--Choisissez une méthode--</option>
          <option value="sophrologie">Sophrologie</option>
          <option value="meditation">Méditation</option>
          <option value="yoga">Yoga</option>
          <option value="voyages_sonores">Voyages Sonores</option>
          <option value="coherence_cardiaque">Cohérence Cardiaque</option>
          <option value="autre">Autre</option>
        </select>{" "}
        {seanceData.method === "autre" && (
          <input
            className={styles.otherInput}
            type="text"
            id="other_method"
            placeholder="Précisez ici"
            required
            onChange={(e) =>
              setSeanceData({ ...seanceData, method: e.target.value })
            }
          />
        )}
      </label>
      <label className={styles.create_label} htmlFor="thematic-select">
        {" "}
        <select
          className={styles.select}
          name="thematic"
          id="thematic-select"
          required
          onChange={(e) =>
            setSeanceData({ ...seanceData, thematic: e.target.value })
          }
        >
          <option value="">--Choisissez un théme--</option>
          <option value="decouverte">Découverte</option>
          <option value="sommeil">Sommeil</option>
          <option value="energie">Energie</option>
          <option value="grossesse">Grossesse</option>
          <option value="stress">Stress</option>
          <option value="enfant">Enfant</option>
          <option value="emotion">Emotion</option>
          <option value="mental">Mental</option>
          <option value="autre">Autre</option>
        </select>
        {seanceData.thematic === "autre" && (
          <input
            className={styles.otherInput}
            type="text"
            id="other_thematic"
            placeholder="Précisez ici"
            required
            onChange={(e) =>
              setSeanceData({ ...seanceData, thematic: e.target.value })
            }
          />
        )}
      </label>
    </form>
  );
}