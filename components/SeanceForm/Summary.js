import React, { useContext } from "react";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function Summary() {
  const { seanceData } = useContext(createSeanceContext);

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryTitle}>{seanceData.title}</h2>
      <h3 className={styles.summaryMethod}>
        {seanceData.method} / {seanceData.thematic}
      </h3>
      <h3 className={styles.summaryDataTitle}>Description : </h3>
      <p className={styles.summaryData}>{seanceData.description}</p>
      <h3 className={styles.summaryDataTitle}>Fichier Audio :</h3>
      {seanceData.media_path ? (
        <audio controls src={seanceData.media_path}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      ) : (
        <p>Aucun média associé</p>
      )}
      <div>
        <h3 className={styles.summaryDataTitle}>Clients associés : </h3>
        {seanceData.clientList.length > 0 ? (
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
