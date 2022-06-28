import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMethod, getThematic, getSeanceData } from "../../model/seances";
import styles from "./SeanceCard.module.css";

export default function SeanceCard({ id }) {
  const [seanceData, setSeanceData] = useState();
  const [thematic, setThematic] = useState({ color: "#C5C5DB" });
  const [method, setMethod] = useState({ name: "" });
  const [time, setTime] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const formatTime = (second) => {
    if (second) {
      const minutes = Math.floor(second / 60);
      const seconds = second % 60;

      const timeString =
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");

      return timeString;
    }
  };

  useEffect(() => {
    if (isLoading)
      getSeanceData(id).then(setSeanceData).then(setIsLoading(false));
    else {
      getMethod(seanceData.method).then((data) => setMethod(data));
      getThematic(seanceData.thematic).then((data) => setThematic(data));
      setTime(formatTime(seanceData.media_duration));
    }
  }, [id, isLoading]);

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
            <p className={styles.number}>{time || null}</p>
          </div>
        </a>
      </Link>
    );
  }
}
