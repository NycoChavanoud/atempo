import React from "react";
import styles from "./SeanceDetails.module.css";

export default function SessionDetails() {
  return (
    <>
      <h2 className={`${styles.h2} mb-10`}>Titre</h2>
      <h2 className={styles.h2}>Description</h2>
      <p className={styles.p}>
        Description : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Condimentum diam orci pretium a pharetra, feugiat cursus. Dictumst
        risus, sem egestas odio cras adipiscing vulputate. Nisi, risus in susc
      </p>
    </>
  );
}
