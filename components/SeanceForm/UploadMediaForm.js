import React, { useRef } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function UploadMediaForm() {
  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  };

  return (
    <form>
      <label className={styles.create_label} htmlFor="mp3_url">
        {" "}
        Télécharger la séance mp3 :
        <input type="file" className={styles.input_file} ref={fileInput} />
      </label>

      <button
        onClick={selectFile}
        type="submit"
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
    </form>
  );
}
