import React, { useContext, useEffect, useState } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import createSeanceContext from "../../context/createSeanceContext";

export default function AddClientsForm() {
  const { seanceData, setSeanceData } = useContext(createSeanceContext);
  const [clientList] = useState([]);

  useEffect(() => {
    setSeanceData({ ...seanceData, clientList: clientList });
  }, [clientList]);

  return (
    <div className={styles.AddClientsContainer}>
      <h2 className={styles.create_label}>
        Associer un ou plusieurs clients à la séances :{" "}
      </h2>

      <button className="flex justify-center items-center m-auto">
        <AddCircleIcon
          sx={{
            color: "#F98F83",
            width: "120px",
            height: "120px",
            margin: "10px",
          }}
        />
      </button>
    </div>
  );
}
