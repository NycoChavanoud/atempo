import React, { useContext, useEffect, useState } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import createSeanceContext from "../../context/createSeanceContext";
import LinkedClientModal from "../LinkedClientModal/LinkedClientModal";
import ClientCard from "../ClientCard/ClientCard";

export default function AddClientsForm() {
  const { seanceData, setCompletedStep } = useContext(createSeanceContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCompletedStep(true);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.create_label}>
        Associer un ou plusieurs clients à la séances :{" "}
      </h2>
      <div className="flex flex-row justify-center flex-wrap gap-1">
        {seanceData.clientList?.map((client) => (
          <ClientCard key={client.id} id={client.id} circle={true} />
        ))}
      </div>

      <button
        className="flex justify-center items-center m-auto"
        onClick={handleOpen}
      >
        <AddCircleIcon
          sx={{
            color: "#F98F83",
            width: "120px",
            height: "120px",
            margin: "10px",
          }}
        />
      </button>
      <LinkedClientModal open={open} onClose={handleClose} />
    </div>
  );
}
