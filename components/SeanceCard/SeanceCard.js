import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMethod, getThematic, getSeanceData } from "../../model/seances";
import Duration from "./Duration";
import styles from "./SeanceCard.module.css";

export default function SeanceCard({ id }) {
  const [seanceData, setSeanceData] = useState();
  const [thematic, setThematic] = useState({ color: "#C5C5DB", name: "" });
  const [method, setMethod] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSeanceData(id).then(setSeanceData).then(setIsLoading(false));

    if (seanceData) {
      getMethod(seanceData.method).then((data) => setMethod(data));
      getThematic(seanceData.thematic).then((data) => setThematic(data));
    }
  }, [id, isLoading, seanceData]);

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
            <Duration seconds={seanceData.media_duration} />
          </div>
        </a>
      </Link>
    );
  }
}
