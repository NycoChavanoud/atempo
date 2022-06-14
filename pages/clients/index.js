import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import { Avatar } from "@mui/material";
import Link from "next/link";

export default function Clients() {
  return (
    <Layout pageTitle="Clients">
      <GreyBurger />
      <div className={style.box}>
        <Avatar alt="votre photo" sx={{ width: 100, height: 100 }} />
        <h1 className={style.title}>Mes clients</h1>
      </div>
      <Link href="/clients/create" className={style.purple}>
        <button>Ajouter un client</button>
      </Link>
    </Layout>
  );
}
