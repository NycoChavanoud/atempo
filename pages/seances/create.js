import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/Seances.module.css";
import MainDataForm from "../../components/SeanceForm/MainDataForm";
import UploadMediaForm from "../../components/SeanceForm/UploadMediaForm";
import DescriptionForm from "../../components/SeanceForm/DescriptionForm";
import ProgressStepper from "../../components/ProgressStepper/ProgressStepper";

export default function CreateSeance() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {}, [activeStep]);

  return (
    <Layout pageTitle="Création d'une séance" shape={true}>
      <div className={styles.createContainer}>
        <h1 className={styles.create_title}>Création de la séance</h1>
        {activeStep === 0 && <MainDataForm />}
        {activeStep === 1 && <UploadMediaForm />}
        {activeStep === 2 && <DescriptionForm />}
        <ProgressStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </Layout>
  );
}
