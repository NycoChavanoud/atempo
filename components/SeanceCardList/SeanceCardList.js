import React from "react";
import SessionCard from "../SeanceCard/SeanceCard";
import styles from "./SeanceCardList.module.css";

export default function SeanceCardList({ seanceList }) {
  return (
    <div className={styles.list}>
      {seanceList
        ? seanceList.map((s) => (
            <SessionCard key={s.id} id={s.id}></SessionCard>
          ))
        : null}
    </div>
  );
}
