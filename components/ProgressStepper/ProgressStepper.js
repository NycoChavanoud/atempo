import React, { useContext } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import createSeanceContext from "../../context/createSeanceContext";

export default function ProgressStepper({ activeStep, setActiveStep }) {
  const { submitStep } = useContext(createSeanceContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    submitStep();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={3}
      position="static"
      activeStep={activeStep}
      sx={{
        maxWidth: "350px",
        maxHeight: "80px",
        background: "none",
        flexGrow: 1,
        "& .MuiLinearProgress-bar": {
          background: "#F98F83",
        },
        "& .MuiLinearProgress-root": {
          background: "#DADADA",
        },
      }}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === 2}
          sx={{ color: "#F98F83" }}
        >
          <ArrowCircleRightIcon
            sx={{
              width: "50px",
              height: "50px",
            }}
          />
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ color: "#F98F83" }}
        >
          <ArrowCircleLeftIcon
            sx={{
              width: "50px",
              height: "50px",
            }}
          />
        </Button>
      }
    />
  );
}
