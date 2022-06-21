import style from "./creationClient.module.css";
import Layout from "../../components/Layout/Layout";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import ProblematicForm from "../../components/ClientForm/ProblematicForm";
import { CreateClientContextProvider } from "../../context/createClientContext";

export default function CreateClient() {
  return (
    <CreateClientContextProvider>
      <Layout pageTitle="Ajout de la problématique" shape={true}>
        <WhiteBurger />
        <h1 className={style.probTitle}>Ajoutez la ou les problématiques</h1>
        <ProblematicForm />
      </Layout>
    </CreateClientContextProvider>
  );
}
