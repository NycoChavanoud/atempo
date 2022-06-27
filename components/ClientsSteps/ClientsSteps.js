import React, { useContext } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import createClientContext from "../../context/createClientContext";
import { createClient } from "../../model/client";
import Link from "next/link";

export default function ClientsSteps({ activeStep, setActiveStep }) {
  const { clientData, setClientData } = useContext(createClientContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = async () => {
    await createClient(clientData);
    setClientData({});
  };
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

        <Link href="/clients">
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
