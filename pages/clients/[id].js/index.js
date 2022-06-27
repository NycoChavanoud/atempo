import React from "react";
import Layout from "../../../components/Layout/Layout";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import GreyBurger from "../../../components/GreyBurger/GreyBurger";
import { useRouter } from "next/router";

export default function Client() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout pageTitle={"Client"}>
      <GreyBurger />
      <ClientDetails id={id} />
    </Layout>
  );
}
