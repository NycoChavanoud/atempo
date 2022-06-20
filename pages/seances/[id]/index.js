import React from "react";
import Layout from "../../../components/Layout/Layout";
import Link from "next/link";
import styles from "../../../styles/Seances.module.css";
import SeanceDetails from "../../../components/SeanceDetails/SeanceDetails";
import AssociatedClients from "../../../components/AssociatedClients/AssociatedClients";
import { useRouter } from "next/router";
import WaveWhiteBurger from "../../../components/WaveWhiteBurger/WaveWhiteBurger";

export default function Seance() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout pageTitle={"Séance"}>
      <WaveWhiteBurger />
      <div className="flex flex-col pl-10 pr-10 pb-5">
        <h1 className={`${styles.title} mb-8`}>Séance</h1>
        <SeanceDetails id={id} />
        <AssociatedClients />
        <div className="flex item-center justify-center">
          <Link href="/seances/id/edit">
            <button
              className={styles.add_btn}
              style={{ opacity: "0.5" }}
              disabled
            >
              Modifier
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
