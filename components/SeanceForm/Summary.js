import React, { useContext } from "react";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function Summary() {
  const { seanceData } = useContext(createSeanceContext);

  if (seanceData) {
    return (
      <div className={styles.summaryContainer}>
        <h2 className={styles.summaryTitle}>{seanceData.title}</h2>
        <h3 className={styles.summaryMethod}>
          {seanceData.method} / {seanceData.thematic}
        </h3>
        <h3 className={styles.summaryDataTitle}>Description : </h3>
        <p className={styles.summaryData}>{seanceData.description}</p>
        <h3 className={styles.summaryDataTitle}>Fichier Audio :</h3>
        {seanceData.media ? (
          <p>{seanceData.media.name}</p>
        ) : (
          <p>Aucun média associé</p>
        )}
        <div>
          <h3 className={styles.summaryDataTitle}>Clients associés : </h3>
          {seanceData.clientList ? (
            seanceData.clientList.map((client) => (
              <div key={client}>{client}</div>
            ))
          ) : (
            <p>Aucun client associé</p>
          )}
        </div>
      </div>
    );
  }
}
