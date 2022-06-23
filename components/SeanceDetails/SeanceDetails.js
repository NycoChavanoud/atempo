import React, { useEffect, useState } from "react";
import { getMethod, getSeanceData, getThematic } from "../../model/seances";
import styles from "./SeanceDetails.module.css";

export default function SessionDetails({ id }) {
  const [seanceData, setSeanceData] = useState({});
  const [thematic, setThematic] = useState({ name: "-" });
  const [method, setMethod] = useState({ name: "-" });

  useEffect(() => {
    getSeanceData(id).then(setSeanceData);
    if (seanceData) {
      getThematic(seanceData.thematic).then(setThematic);
      getMethod(seanceData.method).then(setMethod);
    }
  }, [id, seanceData, thematic, method]);

  if (seanceData && method && thematic) {
    return (
      <div className="mb-5">
        <h2 className={`${styles.h2} mb-5`}>{seanceData.title}</h2>
        <h3>
          {method.name} - {thematic.name}
        </h3>

        <p className={styles.p}>{seanceData.description}</p>
      </div>
    );
  }
}
