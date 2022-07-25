import style from "../ClientsSteps/ClientsSteps.module.css";
import React, { useContext, useEffect } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import createClientContext from "../../context/createClientContext";
import { getClientData, updateClient } from "../../model/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

export default function ClientsSteps({ activeStep, setActiveStep }) {
  const { clientData, setClientData, validation, setValidation } =
    useContext(createClientContext);

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const warn = () => {
    toast.warn("Veuillez renseigner tout les champs.", {
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
      setValidation(true);
    } else {
      warn();
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = async () => {
    await updateClient(id, { ...clientData });
    router.push(`/clients/${id}`);
  };
  useEffect(() => {
    getClientData(user, id).then(setClientData);
  }, [id, setClientData, user]);
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
        <button
          onClick={handleBack}
          style={{ position: "absolute", left: "18%" }}
        >
          <ArrowCircleLeftIcon
            style={{ width: "10vw", height: "10vh", color: "var(--color1)" }}
          />
        </button>

        <Link href={`/clients/${id}`}>
          <button
            type="submit"
            onClick={handleSubmit}
            id="submitBtn"
            className={style.smtBtn}
          >
            Confirmer
          </button>
        </Link>
      </div>
    );
  }
}
