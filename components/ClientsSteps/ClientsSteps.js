import style from "./ClientsSteps.module.css";
import { useContext } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import createClientContext from "../../context/createClientContext";
import { createClient } from "../../model/client";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ClientsSteps({ activeStep, setActiveStep }) {
  const { clientData, setClientData, validation, setValidation } =
    useContext(createClientContext);

  const warn = () => {
    toast.warn("Veuillez renseigner tout les champs.", {
      position: "bottom-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const success = () => {
    toast.success("Client enregistré.", {
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
      warn();
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = async () => {
    await createClient(clientData);
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
        <button
          onClick={handleBack}
          style={{ position: "absolute", left: "45px" }}
        >
          <ArrowCircleLeftIcon
            style={{ width: "10vw", height: "10vh", color: "var(--color1)" }}
          />
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
