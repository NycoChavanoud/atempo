import style from "../creationClient.module.css";
import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import WhiteBurger from "../../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../../components/ClientForm/ClientForm";
import MotifForm from "../../../components/ClientForm/MotifForm";
import ClientsEditSteps from "../../../components/ClientEditSteps/ClientsEditSteps";
import { CreateClientContextProvider } from "../../../context/createClientContext";
import Avatar from "../../../components/Avatar/Avatar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateClient() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <CreateClientContextProvider>
      <Layout shape pageTitle={"Modification d'une fiche client"}>
        <WhiteBurger />
        <h1 className={style.title}>Modification(s)</h1>
        <Avatar />
        {activeStep === 0 && <ClientForm />}
        {activeStep === 1 && <MotifForm />}

        <ClientsEditSteps
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <ToastContainer />
      </Layout>
    </CreateClientContextProvider>
  );
}
