import React from "react";
import Layout from "../../../components/Layout/Layout";
import Link from "next/link";
import styles from "../../../styles/Sessions.module.css";
import SessionDetails from "../../../components/SessionDetails/SessionDetails";
import AssociatedClients from "../../../components/AssociatedClients/AssociatedClients";

export default function Session() {
  return (
    <Layout pageTitle={"Séance"} wave={true}>
      <h1 className={`${styles.title} mb-12`}>Séance</h1>
      <SessionDetails />
      <AssociatedClients />
      <Link href="/sessions/id/edit">
        <button className={styles.add_btn}>Modifier</button>
      </Link>
    </Layout>
  );
}
