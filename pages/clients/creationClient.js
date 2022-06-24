import style from "./creationClient.module.css";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import ClientForm from "../../components/ClientForm/ClientForm";
import ProblematicForm from "../../components/ClientForm/MotifForm";
import ClientsSteps from "../../components/ClientSteps/ClientsSteps";
import { Avatar } from "@mui/material";
import { CreateClientContextProvider } from "../../context/createClientContext";

export default function CreateClient() {
  const [activeStep, setActiveStep] = useState(0);
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
        {activeStep === 0 && <ClientForm />}
        {activeStep === 1 && <ProblematicForm />}

        <ClientsSteps activeStep={activeStep} setActiveStep={setActiveStep} />
      </Layout>
    </CreateClientContextProvider>
  );
}
