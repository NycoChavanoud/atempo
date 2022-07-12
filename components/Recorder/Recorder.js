import React, { useContext, useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import createSeanceContext from "../../context/createSeanceContext";

export default function Recorder() {
  const { setMedia } = useContext(createSeanceContext);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaURL, setMediaURL] = useState("");
  const [time, setTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState({});

  const handleStart = async (e) => {
    e.preventDefault();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const newRecorder = new MediaRecorder(stream);
    setMediaRecorder(newRecorder);
    setIsRecording(true);
    mediaRecorder.start();
  };

  const handleStop = (e) => {
    e.preventDefault();

    mediaRecorder.addEventListener("stop", () => {
      const newBlob = mediaRecorder.requestData();
      const newMediaUrl = URL.createObjectURL(newBlob);
      setMedia(newBlob);
      setMediaURL(newMediaUrl);
    });
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const handlePauseOrResume = (e) => {
    e.preventDefault();

    if (isRecording) {
      mediaRecorder.pause();
      setIsRecording(false);
    } else {
      mediaRecorder.resume();
      setIsRecording(true);
    }
  };

  useEffect(() => {
    if (isRecording) {
      setTimeout(() => setTime(time + 1), 1000);
    }
  }, [isRecording, time]);

  return (
    <div className="flex flex-col items-center justify-center m-5">
      <h3>Enregistreur :</h3>
      <div>{time}</div>
      <div>{mediaURL}</div>
      <div className="flex flex-row justify-between items-center">
        {!isRecording ? (
          <button onClick={handleStart}>
            <PlayCircleIcon />
          </button>
        ) : (
          <button onClick={handlePauseOrResume}>
            <PauseCircleFilledIcon />
          </button>
        )}

        <button onClick={handleStop}>
          <StopCircleIcon />
        </button>
      </div>
    </div>
  );
}
