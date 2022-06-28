import React, { useContext, useEffect } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import createClientContext from "../../context/createClientContext";
import { getClientData, updateClient } from "../../model/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ClientsSteps({ activeStep, setActiveStep }) {
  const { clientData, setClientData, validation, setValidation } =
    useContext(createClientContext);

  const router = useRouter();
  const { id } = router.query;

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
    success();
    router.push(`/clients/${id}`);
  };
  useEffect(() => {
    getClientData(id).then(setClientData);
  }, [id, setClientData]);
  if (activeStep < 1) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            width: "150px",
            height: "50px",
            backgroundColor: "var(--color1)",
            borderRadius: "20px",
            padding: "20px",
            color: "white",
            fontWeight: "700",
            fontSize: "1.5em",
            letterSpacing: "1px",
            position: "absolute",
            bottom: "6vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn"
          onClick={handleNext}
        >
          Suivant
        </button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
        }}
      >
        <button
          onClick={handleBack}
          style={{ position: "absolute", left: "45px" }}
        >
          <ArrowCircleLeftIcon
            sx={{
              width: "40px",
              height: "40px",
              color: "var(--color1)",
            }}
          />
        </button>

        <Link href={`/clients/${id}`}>
          <button
            type="submit"
            onClick={handleSubmit}
            id="submitBtn"
            style={{
              width: "150px",
              height: "50px",
              background: "var(--color1",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bolder",
              fontSize: "1.5em",
            }}
          >
            Confirmer
          </button>
        </Link>
      </div>
    );
  }
}
