import React from "react";
import styles from "./BurgerButton.module.css";

export default function BurgerButton({ black = true }) {
  return (
    <div className={styles.components}>
      <input className={styles.menu_checkbox} type="checkbox" />
      <label className={styles.burger} htmlFor="menu_checkbox">
        <div
          className={styles.bar}
          style={
            black ? { borderTopColor: "black" } : { borderTopColor: "white" }
          }
        ></div>
        <div
          className={styles.bar}
          style={
            black ? { borderTopColor: "black" } : { borderTopColor: "white" }
          }
        ></div>
        <div
          className={styles.bar}
          style={
            black ? { borderTopColor: "black" } : { borderTopColor: "white" }
          }
        ></div>
      </label>
    </div>
  );
}
