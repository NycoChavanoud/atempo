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
import { toast } from "react-toastify";
import { getClientData, updateClient } from "../../model/client";

export default function ProgressStepper({ activeStep, setActiveStep }) {
  const { seanceData, setSeanceData, media, completedStep, setCompletedStep } =
    useContext(createSeanceContext);

  const warn = (m) =>
    toast.warn(m, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const success = () =>
    toast.success("La séance a été enregistré", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleNext = () => {
    if (completedStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setCompletedStep(false);
    } else warn("Veuillez remplir tous les champs");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitSeanceForm = async () => {
    const seanceID = await createSeance(seanceData);
    const media_url = await postSeanceMedia(
      media,
      seanceID,
      `${seanceData.title}-${seanceData.media_name}`
    );
    updateSeance(seanceID, {
      media_url,
    });

    const clientIDList = seanceData.clientList.map((client) => client.id);

    for (const clientID of clientIDList) {
      const clientData = await getClientData(clientID);
      let newSeanceList = [seanceID];
      if (clientData.seanceList)
        newSeanceList = [...clientData.seanceList, seanceID];
      updateClient(clientID, {
        seanceList: newSeanceList,
      });
    }
    success();
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
