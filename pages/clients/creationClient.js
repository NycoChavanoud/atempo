import style from "./creationClient.module.css";
import Layout from "../../components/Layout/Layout";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../components/ClientForm/ClientForm";
import { Avatar } from "@mui/material";
import { CreateClientContextProvider } from "../../context/createClientContext";

export default function CreateClient() {
  return (
    <CreateClientContextProvider>
      <Layout pageTitle="Création d'un client" shape={true}>
        <WhiteBurger />
        <h1 className={style.title}>Création du profil client</h1>
        <Avatar
          className={style.user}
          alt="photo du client"
          sx={{ width: 80, height: 80 }}
        />
        <ClientForm />
      </Layout>
    </CreateClientContextProvider>
  );
}
