import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/Seances.module.css";
import MainDataForm from "../../components/SeanceForm/MainDataForm";
import UploadMediaForm from "../../components/SeanceForm/UploadMediaForm";
import DescriptionForm from "../../components/SeanceForm/DescriptionForm";
import ProgressStepper from "../../components/ProgressStepper/ProgressStepper";
import { CreateSeanceContextProvider } from "../../context/createSeanceContext";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import AssociatedClients from "../../components/AssociatedClients/AssociatedClients";

export default function CreateSeance() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {}, [activeStep]);

  return (
    <CreateSeanceContextProvider>
      <Layout pageTitle="Création d'une séance" shape={true}>
        <WhiteBurger wave={false} />
        <form>
          <div className={styles.createContainer}>
            <h1 className={styles.create_title}>Création de la séance</h1>
            {activeStep === 0 && <MainDataForm />}
            {activeStep === 1 && <UploadMediaForm />}
            {activeStep === 2 && <DescriptionForm />}
            {activeStep === 3 && <AssociatedClients />}
            <ProgressStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
        </form>
      </Layout>
    </CreateSeanceContextProvider>
  );
}
