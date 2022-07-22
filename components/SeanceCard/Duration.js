import React from "react";
import styles from "./SeanceCard.module.css";

function format(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());

  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string) {
  return ("0" + string).slice(-2);
}

export default function Duration({ seconds }) {
  if (isNaN(seconds)) return null;
  else
    return (
      <time dateTime={`P${Math.round(seconds)}S`} className={styles.number}>
        {format(seconds)}
      </time>
    );
}
