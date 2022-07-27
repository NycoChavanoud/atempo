/* eslint-disable no-useless-escape */

import style from "./ClientsSteps.module.css";
import { useContext } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import createClientContext from "../../context/createClientContext";
import { createClient } from "../../model/client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

export default function ClientsSteps({ activeStep, setActiveStep }) {
  const { clientData, setClientData, validation, setValidation } =
    useContext(createClientContext);
  const { user } = useAuth();

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

  const success = () => {
    toast.success("Client enregistré.", {
      position: "bottom-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const warn = (m) => {
    toast.warn(m, {
      position: "bottom-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleNext = () => {
    if (validation) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setValidation(false);
    } else {
      clientData.firstname ? "" : warn("Veuillez renseigner le prénom");
      clientData.lastname ? "" : warn("Veuillez renseigner le nom");
      clientData.email?.match(emailRegex)
        ? ""
        : warn("Veuillez renseigner un email valide");
      clientData.phoneNumber?.match(phoneRegex)
        ? ""
        : warn("Veuillez renseigner un numéro de téléphone valide");
      clientData.streetNumber?.length >= 1
        ? ""
        : warn("Veuillez renseigner le numéro de rue");
      clientData.streetName?.length >= 3
        ? ""
        : warn("Veuillez renseigner la rue");
      clientData.postalCode?.length === 5
        ? ""
        : warn("Veuillez renseigner le code postal");
      clientData.city?.length >= 1 ? "" : warn("Veuillez renseigner la ville");
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = async () => {
    await createClient(user, clientData);
    setClientData({});
    success();
    setTimeout(2000);
  };
  if (activeStep < 1) {
    return (
      <div className={style.box}>
        <button className={style.btn} id="btn" onClick={handleNext}>
          Suivant
        </button>
      </div>
    );
  } else {
    return (
      <div className={style.container}>
        <button onClick={handleBack} className={style.arrowBtn}>
          <ArrowCircleLeftIcon style={{ width: "10vw", height: "8vh" }} />
        </button>

        <Link href="/clients">
          <button
            className={style.smtBtn}
            type="submit"
            onClick={handleSubmit}
            id="submitBtn"
          >
            Confirmer
          </button>
        </Link>
      </div>
    );
  }
}
