import style from "./clientDetails.module.css";
import Layout from "../../../components/Layout/Layout";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import GreyBurger from "../../../components/GreyBurger/GreyBurger";
import { useRouter } from "next/router";
import { getClientData } from "../../../model/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SeanceCard from "../../../components/SeanceCard/SeanceCard";

export default function Client() {
  const router = useRouter();
  const { id } = router.query;
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    getClientData(id).then(setClientData);
  }, [id]);

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
        <div className="flex flex-col justify-center items-center">
          <h2 className={style.title}>Séance.s associée.s : </h2>
          <div className="flex flex-row overflow-x-auto">
            {clientData.seanceList?.map((seanceID) => (
              <SeanceCard key={seanceID} id={seanceID} circle={true} />
            ))}
          </div>
          {!clientData.seanceList && <p>Pas de séance associée</p>}
        </div>

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
