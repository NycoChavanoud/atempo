import React, { useContext, useEffect, useState } from "react";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function MainDataForm() {
  const { seanceData, setSeanceData, setSubmitStep } =
    useContext(createSeanceContext);
  const [title, setTitle] = useState("Titre de la séance");
  const [method, setMethod] = useState("");
  const [thematic, setThematic] = useState("");
  const [otherMethod, setOtherMethod] = useState("Précisez ici");
  const [otherThematic, setOtherThematic] = useState("Précisez ici");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleMethod = (e) => setMethod(e.target.value);
  const handleThematic = (e) => setThematic(e.target.value);
  const handleOtherMethod = (e) => setOtherMethod(e.target.value);
  const handleOtherThematic = (e) => setOtherThematic(e.target.value);

  const submitMainData = () => {
    setSeanceData({ ...seanceData, title });
    if (method === "other") {
      setSeanceData({ ...seanceData, otherMethod });
    } else setSeanceData({ ...seanceData, method });
    if (thematic === "other") {
      setSeanceData({ ...seanceData, otherThematic });
    } else setSeanceData({ ...seanceData, thematic });
  };

  useEffect(() => {
    setSubmitStep(submitMainData());
  }, [thematic, method]);

  return (
    <div className={styles.MainDataContainer}>
      <label className={styles.create_label} htmlFor="titre">
        {" "}
        <input
          className={styles.create_input_title}
          type="text"
          id="title"
          placeholder={title}
          required
          onChange={handleTitle}
        />
      </label>
      <label className={styles.create_label} htmlFor="method-select" required>
        {" "}
        <select
          className={styles.select}
          name="method"
          id="method-select"
          required
          onChange={handleMethod}
        >
          <option value="">--Choisissez une méthode--</option>
          <option value="sophrology">Sophrologie</option>
          <option value="meditation">Méditation</option>
          <option value="yoga">Yoga</option>
          <option value="travel">Voyages Sonores</option>
          <option value="coherence">Cohérence Cardiaque</option>
          <option value="other">Autre</option>
        </select>{" "}
        {method === "other" && (
          <input
            className={styles.otherInput}
            type="text"
            id="other_method"
            placeholder={otherMethod}
            required
            onChange={handleOtherMethod}
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
          onChange={handleThematic}
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
        {thematic === "other" && (
          <input
            className={styles.otherInput}
            type="text"
            id="other_thematic"
            placeholder={otherThematic}
            required
            onChange={handleOtherThematic}
          />
        )}
      </label>
    </div>
  );
}
