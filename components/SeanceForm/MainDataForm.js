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
          <option value="sophrology">Sophrologie</option>
          <option value="meditation">Méditation</option>
          <option value="yoga">Yoga</option>
          <option value="travel">Voyages Sonores</option>
          <option value="coherence">Cohérence Cardiaque</option>
          <option value="other">Autre</option>
        </select>{" "}
        {seanceData.method === "other" && (
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
          <option value="discover">Découverte</option>
          <option value="sleep">Sommeil</option>
          <option value="pregnancy">Grossesse</option>
          <option value="stress">Stress</option>
          <option value="children">Enfants</option>
          <option value="emotion">Emotion</option>
          <option value="mental">Mental</option>
          <option value="other">Autre</option>
        </select>
        {seanceData.thematic === "other" && (
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
