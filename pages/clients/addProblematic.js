import style from "./creationClient.module.css";
import Layout from "../../components/Layout/Layout";
import ProblematicForm from "../../components/ClientForm/ProblematicForm";
import { CreateClientContextProvider } from "../../context/createClientContext";

export default function CreateClient() {
  return (
    <CreateClientContextProvider>
      <Layout pageTitle="Ajout de la problématique" shape={true}>
        <h1 className={style.probTitle}>Problématique(s)</h1>
        <ProblematicForm />
      </Layout>
    </CreateClientContextProvider>
  );
}
