import { CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import ReactPlayer from "react-player";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./SeanceForm.module.css";

export default function Summary() {
  const { seanceData, isLoading, urlSource } = useContext(createSeanceContext);

  if (seanceData) {
    return (
      <div className={styles.container}>
        <h2 className={styles.summaryTitle}>{seanceData.title}</h2>
        <h3 className={styles.summaryMethod}>
          {seanceData.method} / {seanceData.thematic}
        </h3>
        {isLoading ? (
          <div>
            <h2>Upload de la séance...</h2>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div>
            <h3 className={styles.summaryDataTitle}>Description : </h3>
            <p className={styles.summaryData}>{seanceData.description}</p>
            <h3 className={styles.summaryDataTitle}>Fichier Audio :</h3>
            <p>{seanceData.media_name || "Aucun média associé"}</p>
            {urlSource && (
              <div className="flex justify-center items-center w-[100%] mb-5">
                <ReactPlayer
                  url={urlSource}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}
            <div>
              <h3 className={styles.summaryDataTitle}>Clients associés : </h3>
              {seanceData.clientList ? (
                seanceData.clientList.map((client) => (
                  <div
                    key={client.id}
                  >{`${client.firstname} ${client.lastname}`}</div>
                ))
              ) : (
                <p>Aucun client associé</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
