import style from "./creationClient.module.css";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../components/ClientForm/ClientForm";
import MotifForm from "../../components/ClientForm/MotifForm";
import ClientsSteps from "../../components/ClientsSteps/ClientsSteps";
import { CreateClientContextProvider } from "../../context/createClientContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateClient() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <CreateClientContextProvider>
      <Layout pageTitle="Création d'une fiche patient" shape>
        <div className={style.boxes}>
          <div className={style.bg}>
            <DesktopMenu />
          </div>
          <div>
            <WhiteBurger />
            <h1 className={style.title}>Création du profil patient</h1>
            {activeStep === 0 && <ClientForm />}
            {activeStep === 1 && <MotifForm />}

            <ClientsSteps
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
          <ToastContainer />
        </div>
      </Layout>
    </CreateClientContextProvider>
  );
}
