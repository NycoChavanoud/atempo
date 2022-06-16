import React, { useEffect, useState } from "react";
import { getMethod, getSeanceData, getThematic } from "../../model/seances";
import styles from "./SeanceDetails.module.css";

export default function SessionDetails({ id }) {
  const [seanceData, setSeanceData] = useState({});
  const [thematic, setThematic] = useState({ name: "/" });
  const [method, setMethod] = useState({ name: "/" });

  useEffect(() => {
    getSeanceData(id).then((data) => setSeanceData(data));

    if (seanceData) {
      getThematic(seanceData.thematic_id).then((data) => setThematic(data));
      getMethod(seanceData.method_id).then((data) => setMethod(data));
    }
  }, [id, seanceData]);

  if (seanceData) {
    return (
      <div className="mb-5">
        <h2 className={`${styles.h2} mb-5`}>{seanceData.title}</h2>
        <h3>{method.name}</h3>
        <h3>{thematic.name}</h3>
        <p className={styles.p}>{seanceData.description}</p>
        <audio controls src={seanceData.media_url}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  }
}
