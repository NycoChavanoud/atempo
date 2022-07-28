import style from "../creationClient.module.css";
import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import WhiteBurger from "../../../components/WhiteBurger/WhiteBurger";
import DesktopMenu from "../../../components/DesktopMenu/DesktopMenu";
import ClientForm from "../../../components/ClientForm/ClientForm";
import MotifForm from "../../../components/ClientForm/MotifForm";
import ClientsEditSteps from "../../../components/ClientEditSteps/ClientsEditSteps";
import { CreateClientContextProvider } from "../../../context/createClientContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateClient() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <CreateClientContextProvider>
      <Layout shape pageTitle={"Modification d'une fiche patient"}>
        <div className={style.boxes}>
          <div className={style.bg}>
            <DesktopMenu />
          </div>
          <div>
            <WhiteBurger />
            <h1 className={style.title}>Modification(s)</h1>
            {activeStep === 0 && <ClientForm />}
            {activeStep === 1 && <MotifForm />}

            <ClientsEditSteps
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
            <ToastContainer />
          </div>
        </div>
      </Layout>
    </CreateClientContextProvider>
  );
}
