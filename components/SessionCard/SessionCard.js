import Link from "next/link";
import React from "react";
import styles from "./SessionCard.module.css";

function getRandomColor() {
  const colors = ["#F98F83", "#899EDD", "#BACE94", "#F1BB77", "#FFC498"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function SessionCard({ name, thematic, number }) {
  return (
    <Link href="/sessions/1">
      <a>
        <div
          className={styles.card}
          style={{ backgroundColor: getRandomColor() }}
        >
          <h3 className={styles.thematic}>{thematic}</h3>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.number}>{`${number} ${
            number > 1 ? "séances" : "séance"
          }`}</p>
        </div>
      </a>
    </Link>
  );
}
