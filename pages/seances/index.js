import { Avatar } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import SeanceCardList from "../../components/SeanceCardList/SeanceCardList";
import { getSeancesList } from "../../model/seances.js";
import styles from "../../styles/Seances.module.css";
import GreyBurger from "../../components/GreyBurger/GreyBurger";

export default function MySeances() {
  const [seanceList, setSeanceList] = useState([]);

  useEffect(() => {
    getSeancesList().then(setSeanceList);
  }, []);

  return (
    <Layout pageTitle={"Mes séances"}>
      <GreyBurger />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center justify-around">
          <Avatar sx={{ width: 80, height: 80 }} />
          <h1 className={styles.title}>Mes séances</h1>
        </div>

        <SeanceCardList seanceList={seanceList} />

        <Link href="/seances/create">
          <button className={styles.add_btn}>Ajouter une séance</button>
        </Link>
      </div>
    </Layout>
  );
}
