import React from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "../../../styles/Sessions.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function EditSession() {
  return (
    <Layout pageTitle="Création d'une séance" shape={true}>
      <h1 className={styles.create_title}>Modifier de la séance</h1>
      <form className="mt-20">
        <label className={styles.create_label} htmlFor="titre">
          {" "}
          Titre :
          <input
            className={styles.create_input}
            type="text"
            id="title"
            required
          />
        </label>
        <label className={styles.create_label} htmlFor="description">
          {" "}
          Description :
          <textarea
            className={`${styles.create_input} h-[80px]`}
            id="description"
            required
          />
        </label>
        <label className={styles.create_label} htmlFor="thematic">
          {" "}
          Thématique :
          <input
            className={styles.create_input}
            type="text"
            id="thematic"
            required
          />
        </label>
        <label className={styles.create_label} htmlFor="methode">
          {" "}
          Méthodes :
          <input className={styles.create_input} type="text" id="methode" />
        </label>
        <label className={styles.create_label} htmlFor="mp3_url">
          {" "}
          Télécharger la séance mp3 :
          <input className={styles.add_mp3} type="file" id="mp3_url" required />
        </label>
        <button
          type="submit"
          className="flex justify-center items-center m-auto"
        >
          {" "}
          <AddCircleIcon
            sx={{
              color: "#DADADA",
              width: "90px",
              height: "90px",
              margin: "10px",
            }}
          />
        </button>
      </form>
    </Layout>
  );
}
