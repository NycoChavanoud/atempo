import React from "react";
import styles from "./BurgerButton.module.css";

export default function BurgerButton() {
  return (
    <div className={styles.components}>
      <input className={styles.menu_checkbox} type="checkbox" />
      <label className={styles.burger} htmlFor="menu_checkbox">
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </label>
    </div>
  );
}
