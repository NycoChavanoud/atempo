import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";
import Link from "next/link";
import Avatar from "../../components/Avatar/Avatar";
import ClientCardList from "../../components/ClientCardList/ClientCardList";
import React, { useState, useEffect } from "react";
import { getClientList } from "../../model/client.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clients() {
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  return (
    <Layout pageTitle="Mes Clients">
      <div className={style.boxes}>
        <div>
          <DesktopMenu />
        </div>
        <div>
          <GreyBurger />
          <div className={style.purple}>
            <div className={style.box}>
              <Avatar />
              <h1 className={style.title}>Mes clients</h1>
            </div>

            <ClientCardList clientList={clientList} />
            <div className={style.container}>
              <Link href="/clients/creationClient">
                <button className={style.btn}>Ajouter une fiche client</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
