import React, { useContext, useEffect } from "react";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function MainDataForm() {
  const { seanceData, setSeanceData, setCompletedStep } =
    useContext(createSeanceContext);

  useEffect(() => {
    if (seanceData.title && seanceData.thematic && seanceData.method) {
      if (seanceData.thematic !== "autre" && seanceData.method !== "autre") {
        delete seanceData.other_method;
        delete seanceData.other_thematic;
        setCompletedStep(true);
      } else if (seanceData.method === "autre" && seanceData.other_method)
        setCompletedStep(true);
      else if (seanceData.thematic === "autre" && seanceData.other_thematic)
        setCompletedStep(true);
    } else setCompletedStep(false);
  }, [
    seanceData.method,
    seanceData.other_method,
    seanceData.other_thematic,
    seanceData.thematic,
    seanceData.title,
    setCompletedStep,
  ]);

  return (
    <form className={styles.container}>
      <label className={styles.create_label} htmlFor="titre">
        {" "}
        <input
          className={styles.create_input_title}
          type="text"
          id="title"
          placeholder={"Titre de la séance"}
          value={seanceData.title}
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
          value={seanceData.method || ""}
          required
          onChange={(e) =>
            setSeanceData({ ...seanceData, method: e.target.value })
          }
        >
          <option value={null}>--Choisissez une méthode--</option>
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
            placeholder={"Précisez ici"}
            value={seanceData.other_method}
            required
            onChange={(e) => {
              setSeanceData({ ...seanceData, other_method: e.target.value });
            }}
          />
        )}
      </label>
      <label className={styles.create_label} htmlFor="thematic-select">
        {" "}
        <select
          className={styles.select}
          name="thematic"
          id="thematic-select"
          value={seanceData.thematic || ""}
          required
          onChange={(e) =>
            setSeanceData({ ...seanceData, thematic: e.target.value })
          }
        >
          <option value={null}>--Choisissez un théme--</option>
          <option value="decouverte">Découverte</option>
          <option value="sommeil">Sommeil</option>
          <option value="energie">Energie</option>
          <option value="grossesse">Grossesse</option>
          <option value="stress">Stress</option>
          <option value="enfants">Enfants</option>
          <option value="emotion">Emotion</option>
          <option value="mental">Mental</option>
          <option value="autre">Autre</option>
        </select>
        {seanceData.thematic === "autre" && (
          <input
            className={styles.otherInput}
            type="text"
            id="other_thematic"
            placeholder={"Précisez ici"}
            value={seanceData.other_thematic}
            required
            onChange={(e) =>
              setSeanceData({ ...seanceData, other_thematic: e.target.value })
            }
          />
        )}
      </label>
    </form>
  );
}
