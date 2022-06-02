import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout/Layout";
import SessionCard from "../../components/SessionCard/SessionCard";
import styles from "../../styles/Sessions.module.css";

export default function MySessions() {
  return (
    <Layout pageTitle={"Mes séances"}>
      <div className="flex flex-row items-center justify-between mb-8">
        <Avatar sx={{ width: 80, height: 80 }} />
        <h1 className={styles.title}>Mes séances</h1>
      </div>

      <SessionCard name="test" thematic="yoga" number={10} />
      <Link href="/sessions/create">
        <button className={styles.add_btn}>Ajouter une séance</button>
      </Link>
    </Layout>
  );
}
