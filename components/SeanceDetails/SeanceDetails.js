import React, { useEffect, useState } from "react";
import { getMethod, getThematic } from "../../model/seances";
import styles from "./SeanceDetails.module.css";

export default function SessionDetails({ seanceData }) {
  const [thematic, setThematic] = useState({ name: "-" });
  const [method, setMethod] = useState({ name: "-" });

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    let day = date.getDate();
    if (day < 10) day = `0${day}`;
    let month = date.getMonth();
    if (month < 10) month = `0${month}`;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (seanceData) {
      getThematic(seanceData.thematic).then(setThematic);
      getMethod(seanceData.method).then(setMethod);
    }
  }, [seanceData]);

  if (seanceData && method && thematic) {
    return (
      <div className="mb-2">
        <h2 className={`${styles.h2} mb-2`}>
          {" "}
          {seanceData.method === "autre"
            ? seanceData.other_method
            : method.name}{" "}
          -{" "}
          {seanceData.thematic === "autre"
            ? seanceData.other_thematic
            : thematic.name}
        </h2>
        <h3>créée le {getDate(seanceData.creation_date)}</h3>

        <p className={styles.p}>{seanceData.description}</p>
      </div>
    );
  }
}
