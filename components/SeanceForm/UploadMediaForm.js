import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import createSeanceContext from "../../context/createSeanceContext";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

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

export default function UploadMediaForm() {
  const { seanceData, setSeanceData, setMedia, media, setCompletedStep } =
    useContext(createSeanceContext);

  const [urlSource, setUrlSource] = useState();

  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  };

  const handleFile = () => {
    if (
      fileInput.current.files[0].type.indexOf("audio") !== -1 ||
      fileInput.current.files[0].type.indexOf("video") !== -1
    ) {
      setMedia(fileInput.current.files[0]);
      setSeanceData({
        ...seanceData,
        media_name: fileInput.current.files[0].name,
      });
    } else warn("Veuillez fournir un fichier audio ou vidéo au format valide");
  };

  const handleMediaDuration = (duration) => {
    setSeanceData({
      ...seanceData,
      media_duration: Math.ceil(duration),
    });
  };

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = () => setUrlSource(fileReader.result);

    if (seanceData.media_name) setCompletedStep(true);
    if (media.type) fileReader.readAsDataURL(media);
  }, [seanceData, setCompletedStep, media]);

  return (
    <form className={styles.uploadFileContainer}>
      <label className={styles.create_label} htmlFor="mp3_url">
        {" "}
        Télécharger le fichier de la séance :
        <input
          type="file"
          className={styles.input_file}
          ref={fileInput}
          onChange={handleFile}
          accept=".mp3, .aac, .avi, .mpeg, .wav"
        />
      </label>

      <button
        onClick={selectFile}
        type="button"
        className="flex justify-center items-center m-auto"
      >
        {" "}
        {media.name ? (
          <AddCircleIcon
            style={{
              color: "#412E68",
              width: "120px",
              height: "120px",
              margin: "10px",
              opacity: "0.5",
            }}
          />
        ) : (
          <AddCircleIcon
            style={{
              color: "#FF9083",
              width: "120px",
              height: "120px",
              margin: "10px",
            }}
          />
        )}
      </button>
      <h1>{media.name || "Aucun fichier sélectionné"}</h1>
      <ReactPlayer
        url={urlSource}
        width="100%"
        height="20%"
        controls
        onDuration={handleMediaDuration}
      />
    </form>
  );
}
