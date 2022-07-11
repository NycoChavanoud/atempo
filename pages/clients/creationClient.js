import style from "./creationClient.module.css";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../components/ClientForm/ClientForm";
import MotifForm from "../../components/ClientForm/MotifForm";
import ClientsSteps from "../../components/ClientsSteps/ClientsSteps";
import Avatar from "../../components/Avatar/Avatar";
import { CreateClientContextProvider } from "../../context/createClientContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateClient() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <CreateClientContextProvider>
      <Layout pageTitle="Création d'un client" shape>
        <WhiteBurger />
        <h1 className={style.title}>Création du profil client</h1>
        <Avatar />
        {activeStep === 0 && <ClientForm />}
        {activeStep === 1 && <MotifForm />}

        <ClientsSteps activeStep={activeStep} setActiveStep={setActiveStep} />
        <ToastContainer />
      </Layout>
    </CreateClientContextProvider>
  );
}
