import React from "react";
import SeanceCard from "../SeanceCard/SeanceCard";
import styles from "./SeanceCardList.module.css";

export default function SeanceCardList({ seanceList }) {
  return (
    <div className={styles.list}>
      {seanceList
        ? seanceList.map((s) => <SeanceCard key={s.id} id={s.id}></SeanceCard>)
        : null}
    </div>
  );
}
