import React, { useState } from "react";
import styles from "./SeanceForm.module.css";

export default function DescriptionForm() {
  const [description, setDescription] = useState(
    "Vous pouvez décrire ici la séance en quelques phrases..."
  );

  const handleDescription = (e) => setDescription(e.target.value);

  return (
    <form className={styles.DescriptionContainer}>
      <label className={styles.create_label} htmlFor="description">
        {" "}
        Description{" "}
        <span className={styles.description_option}>(Optionnelle)</span> :
        <textarea
          className={styles.create_description}
          id="description"
          placeholder={description}
          onChange={handleDescription}
        />
      </label>
    </form>
  );
}
