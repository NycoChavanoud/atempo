import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import Link from "next/link";
import { Avatar } from "@mui/material";

export default function Clients() {
  return (
    <Layout pageTitle="Clients">
      <GreyBurger />
      <div className={style.purple}>
        <div className={style.box}>
          <Avatar
            className={style.user}
            alt="votre photo"
            sx={{ width: 100, height: 100 }}
          />
          <h1 className={style.title}>Mes clients</h1>
        </div>
        <Link href="/clients/creationClient">
          <button className={style.btn}>Ajouter un client</button>
        </Link>
      </div>
    </Layout>
  );
}
