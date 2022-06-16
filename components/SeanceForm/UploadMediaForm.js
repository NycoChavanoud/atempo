import React, { useContext, useRef, useState } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import createSeanceContext from "../../context/createSeanceContext";

export default function UploadMediaForm() {
  const { seanceData, setSeanceData } = useContext(createSeanceContext);
  const [file, setFile] = useState();

  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  };

  const handleFile = (e) => {
    setFile(e.target.value);
    console.log(fileInput);
    setSeanceData({ ...seanceData, media: fileInput.current.files[0] });
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
        <AddCircleIcon
          sx={{
            color: "#F98F83",
            width: "120px",
            height: "120px",
            margin: "10px",
          }}
        />
      </button>
      <h1>{file}</h1>
    </form>
  );
}
