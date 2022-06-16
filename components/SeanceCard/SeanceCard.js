import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMethod, getThematic, getSeanceData } from "../../model/seances";
import styles from "./SeanceCard.module.css";

export default function SeanceCard({ id }) {
  const [seanceData, setSeanceData] = useState();
  const [thematic, setThematic] = useState({ color: "#C5C5DB" });
  const [method, setMethod] = useState({ name: "" });

  useEffect(() => {
    getSeanceData(id).then((data) => setSeanceData(data));
    if (seanceData) {
      getMethod(seanceData.method).then((data) => setMethod(data));
      getThematic(seanceData.thematic).then((data) => setThematic(data));
    }
  }, [id, seanceData]);

  if (seanceData) {
    return (
      <Link href={`/seances/${id}`}>
        <a className={styles.a}>
          <div
            className={styles.card}
            style={{ backgroundColor: thematic.color }}
          >
            <h3 className={styles.method}>{method.name}</h3>
            <h2 className={styles.title}>{seanceData.title}</h2>
            <p className={styles.number}>{`time`}</p>
          </div>
        </a>
      </Link>
    );
  }
}
