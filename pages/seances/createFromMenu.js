import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/Seances.module.css";
import MainDataForm from "../../components/SeanceForm/MainDataForm";
import UploadMediaForm from "../../components/SeanceForm/UploadMediaForm";
import DescriptionForm from "../../components/SeanceForm/DescriptionForm";
import ProgressStepper from "../../components/ProgressStepper/ProgressStepper";
import { CreateSeanceContextProvider } from "../../context/createSeanceContext";
import WhiteBurger from "../../components/WhiteBurger/WhiteBurger";
import AddClientsForm from "../../components/SeanceForm/AddClientsForm";
import Summary from "../../components/SeanceForm/Summary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";

export default function CreateSeance() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <CreateSeanceContextProvider>
      <Layout pageTitle="Création d'une séance" shape={true}>
        <div className={styles.boxes}>
          <div>
            <DesktopMenu />
          </div>
          <div>
            <WhiteBurger />
            <div>
              <div className={styles.createContainer}>
                <h1 className={styles.create_title}>Création de la séance</h1>

                {activeStep === 0 && <UploadMediaForm />}
                {activeStep === 1 && <MainDataForm />}
                {activeStep === 2 && <DescriptionForm />}
                {activeStep === 3 && <AddClientsForm />}
                {activeStep === 4 && <Summary />}

                <ProgressStepper
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  className={styles.progressStepper}
                />
              </div>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </Layout>
    </CreateSeanceContextProvider>
  );
}
