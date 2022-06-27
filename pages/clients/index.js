import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import Link from "next/link";
import { Avatar } from "@mui/material";
import ClientCardList from "../../components/ClientCardList/ClientCardList";
import React, { useState, useEffect } from "react";
import { getClientList } from "../../model/client.js";

export default function Clients() {
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  return (
    <Layout pageTitle="Mes Clients">
      <GreyBurger />
      <div className={style.purple}>
        <div className={style.box}>
          <Avatar
            className={style.user}
            alt="votre photo"
            sx={{ width: 100, height: 100 }}
          />
          <h1 className={style.title}>Mes clients</h1>
        </div>

        <ClientCardList clientList={clientList} />

        <Link href="/clients/creationClient">
          <button className={style.btn}>Ajouter une fiche client</button>
        </Link>
      </div>
    </Layout>
  );
}
