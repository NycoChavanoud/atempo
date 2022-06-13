import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import { Avatar } from "@mui/material";

export default function Clients() {
  return (
    <Layout pageTitle="Clients">
      <GreyBurger />
      <div className={style.title}>
        <Avatar alt="votre photo" sx={{ width: 100, height: 100 }} />
        <h1>Mes clients</h1>
      </div>
    </Layout>
  );
}
