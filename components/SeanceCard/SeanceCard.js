import Link from "next/link";
import React, { useEffect, useState } from "react";
import getSeanceData from "../../model/Seances/getSeance";
import styles from "./SeanceCard.module.css";

function getRandomColor() {
  const colors = ["#F98F83", "#899EDD", "#BACE94", "#F1BB77", "#FFC498"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function SeanceCard({ id }) {
  const [seanceData, setSeanceData] = useState();

  console.log(seanceData);
  useEffect(() => {
    setSeanceData(getSeanceData(id));
  }, []);

  return (
    <Link href={`/sessions/${id}`}>
      <a>
        <div
          className={styles.card}
          style={{ backgroundColor: getRandomColor() }}
        >
          <h3 className={styles.thematic}>{"seanceData.thematic"}</h3>
          <h2 className={styles.title}>{"seanceData.title"}</h2>
          <p className={styles.number}>{`time`}</p>
        </div>
      </a>
    </Link>
  );
}
