import style from "./create.module.css";
import Layout from "../../components/Layout/Layout";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../components/ClientForm/ClientForm";
import { Avatar } from "@mui/material";

export default function CreateClient() {
  return (
    <Layout pageTitle="Création d'un client">
      <div className={style.purple}>
        <WhiteBurger />
        <h1 className={style.title}>Création du profil client</h1>
        <Avatar
          className={style.user}
          alt="photo du client"
          sx={{ width: 80, height: 80 }}
        />
        <ClientForm />
      </div>
    </Layout>
  );
}
