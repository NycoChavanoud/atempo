import style from "../creationClient.module.css";
import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import WhiteBurger from "../../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../../components/ClientForm/ClientForm";
import MotifForm from "../../../components/ClientForm/MotifForm";
import ClientsEditSteps from "../../../components/ClientEditSteps/ClientsEditSteps";
import { CreateClientContextProvider } from "../../../context/createClientContext";
import { Avatar } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateClient() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <CreateClientContextProvider>
      <Layout shape pageTitle={"Modification d'une fiche client"}>
        <WhiteBurger />
        <h1
          className={style.title}
          style={{ fontSize: "1.5rem", marginTop: "2vh", marginBottom: "2vh" }}
        >
          Modification des informations
        </h1>
        <Avatar
          className={style.user}
          alt="photo du client"
          sx={{ width: 80, height: 80 }}
        />
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
