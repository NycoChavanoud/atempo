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
import { toast } from "react-toastify";
import { getClientData, updateClient } from "../../model/client";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

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

export default function ProgressStepper({ activeStep, setActiveStep }) {
  const {
    seanceData,
    setSeanceData,
    media,
    completedStep,
    setCompletedStep,
    setIsLoading,
    isLoading,
  } = useContext(createSeanceContext);
  const { user } = useAuth();
  const router = useRouter();

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
    try {
      setIsLoading(true);
      const seanceID = await createSeance(user, seanceData);
      const media_url = await postSeanceMedia(
        user,
        media,
        seanceID,
        `${seanceData.title}-${seanceData.media_name}`
      );
      updateSeance(user, seanceID, {
        media_url,
      });

      const clientIDList = seanceData.clientList?.map((client) => client.id);

      if (clientIDList) {
        for (const clientID of clientIDList) {
          const clientData = await getClientData(user, clientID);
          let newSeanceList = [seanceID];
          if (clientData.seanceList)
            newSeanceList = [...clientData.seanceList, seanceID];
          updateClient(user, clientID, {
            seanceList: newSeanceList,
          });
        }
      }
      success();
      setSeanceData({});
      router.push("/seances");
    } catch (error) {
      console.error(error);
      warn(`Une erreur est survenue : ${error}`);
      router.push("/seances");
    } finally {
      setIsLoading(false);
    }
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
        <button
          onClick={submitSeanceForm}
          style={{
            width: "150px",
            height: "50px",
            background: "#F98F83",
            color: "white",
            borderRadius: "20px",
            fontWeight: "bolder",
          }}
          disabled={isLoading}
        >
          Confirmer
        </button>
      </div>
    );
  }
}
