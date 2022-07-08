import style from "./clientDetails.module.css";
import Layout from "../../../components/Layout/Layout";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import GreyBurger from "../../../components/GreyBurger/GreyBurger";
import { useRouter } from "next/router";
import { getClientData } from "../../../model/client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Client() {
  const router = useRouter();
  const { id } = router.query;
  const [clientData, setClientData] = useState({});
  useEffect(() => {
    getClientData(id).then(setClientData);
  }, [id, clientData]);
  if (clientData) {
    return (
      <Layout pageTitle={"Client"}>
        <div className={style.container}>
          <GreyBurger />
          <Link href="/clients">
            <button className={style.backBtn}>Mes clients</button>
          </Link>
        </div>
        <ClientDetails id={id} />
        <p className={style.text}>{clientData.motif}</p>
        <h2 className={style.title}>Séances écoutées</h2>
        <div className={style.box}>
          <Link href={`/clients/${id}/edit`}>
            <button className={style.btn}>Modifier la fiche</button>
          </Link>
          <button style={{ opacity: "0.5" }} className={style.btn}>
            Envoyer une séance
          </button>
        </div>
      </Layout>
    );
  }
}
