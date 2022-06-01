import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout/Layout";
import SessionCard from "../../components/SessionCard/SessionCard";

export default function MySessions() {
  return (
    <Layout pageTitle={"Mes séances"} wave={true}>
      <h1>Mes séances</h1>
      <Avatar />
      <SessionCard name="test" thematic="yoga" number={10} />
      <Link href="/sessions/create">
        <button className="">Ajouter une séance</button>
      </Link>
    </Layout>
  );
}
