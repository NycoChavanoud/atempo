import React, { useContext } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import createSeanceContext from "../../context/createSeanceContext";
import {
  createSeance,
  postSeanceMedia,
  updateSeance,
} from "../../model/seances";
import Link from "next/link";

export default function ProgressStepper({ activeStep, setActiveStep }) {
  const { seanceData, setSeanceData, media } = useContext(createSeanceContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitSeanceForm = async () => {
    const id = await createSeance(seanceData);
    const media_url = await postSeanceMedia(
      media,
      id,
      `${seanceData.title}-${seanceData.media_name}`
    );
    updateSeance(id, {
      media_url,
    });
    setSeanceData({});
  };

  if (activeStep < 4) {
    return (
      <MobileStepper
        variant="progress"
        steps={5}
        position="static"
        activeStep={activeStep}
        sx={{
          maxWidth: "350px",
          height: "80px",
          width: "80%",
          background: "none",
          position: "absolute",
          bottom: "5vh",
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
            disabled={activeStep === 4}
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
  } else {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "5vh",
          left: "15%",
        }}
      >
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ color: "#F98F83" }}
        >
          <ArrowCircleLeftIcon
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        </Button>

        <Link href="/seances">
          <Button
            onClick={submitSeanceForm}
            style={{
              width: "150px",
              height: "50px",
              background: "#F98F83",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bolder",
            }}
          >
            Confirmer
          </Button>
        </Link>
      </div>
    );
  }
}
