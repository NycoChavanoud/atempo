import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSeanceData, getThematic } from "../../model/seances";
import styles from "./SeanceCard.module.css";

function getRandomColor() {
  const colors = ["#F98F83", "#899EDD", "#BACE94", "#F1BB77", "#FFC498"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function SeanceCard({ id }) {
  const [seanceData, setSeanceData] = useState();
  const [thematic, setThematic] = useState({ name: "" });
  const [color] = useState(getRandomColor());

  useEffect(() => {
    getSeanceData(id).then((data) => setSeanceData(data));
    if (seanceData) {
      getThematic(seanceData.thematic_id).then((data) => setThematic(data));
    }
  }, [id, seanceData]);

  if (seanceData) {
    return (
      <Link href={`/seances/${id}`}>
        <a>
          <div className={styles.card} style={{ backgroundColor: color }}>
            <h3 className={styles.thematic}>{thematic.name}</h3>
            <h2 className={styles.title}>{seanceData.title}</h2>
            <p className={styles.number}>{`time`}</p>
          </div>
        </a>
      </Link>
    );
  }
}
