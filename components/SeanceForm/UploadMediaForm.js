import React, { useContext, useRef } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import createSeanceContext from "../../context/createSeanceContext";

export default function UploadMediaForm() {
  const { seanceData, setSeanceData, setMedia, media } =
    useContext(createSeanceContext);

  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  };

  const handleFile = () => {
    setMedia(fileInput.current.files[0]);
    setSeanceData({
      ...seanceData,
      media_name: fileInput.current.files[0].name,
    });
  };

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
    </form>
  );
}
