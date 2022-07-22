import React, { useContext, useEffect } from "react";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function DescriptionForm() {
  const { seanceData, setSeanceData, setCompletedStep } =
    useContext(createSeanceContext);

  useEffect(() => {
    setCompletedStep(true);
  }, []);

  return (
    <form className={styles.container}>
      <label className={styles.create_label_description} htmlFor="description">
        {" "}
        <h2>
          Description{" "}
          <span className={styles.description_option}>(Optionnelle)</span> :
        </h2>
        <textarea
          className={styles.create_description}
          id="description"
          placeholder="Vous pouvez décrire ici la séance en quelques phrases..."
          value={seanceData.description || ""}
          onChange={(e) =>
            setSeanceData({ ...seanceData, description: e.target.value })
          }
        />
      </label>
    </form>
  );
}
