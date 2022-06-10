import React, { useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Link from "next/link";
import styles from "../../../styles/Seances.module.css";
import SeanceDetails from "../../../components/SeanceDetails/SeanceDetails";
import AssociatedClients from "../../../components/AssociatedClients/AssociatedClients";
import { useRouter } from "next/router";

export default function Seance() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <Layout pageTitle={"Séance"} wave={true}>
      <h1 className={`${styles.title} mb-12`}>Séance</h1>
      <SeanceDetails id={id} />
      <AssociatedClients />
      <Link href="/seances/id/edit">
        <button className={styles.add_btn}>Modifier</button>
      </Link>
    </Layout>
  );
}
