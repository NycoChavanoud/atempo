import React, { useContext, useEffect, useState } from "react";
import styles from "./SeanceForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import createSeanceContext from "../../context/createSeanceContext";
import LinkedClientModal from "../LinkedClientModal/LinkedClientModal";
import { getClientData } from "../../model/client";
import ClientCard from "../ClientCard/ClientCard";

export default function AddClientsForm() {
  const { seanceData, setCompletedStep } = useContext(createSeanceContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [allClientData, setAllClientData] = useState([]);

  const getAllClientData = async () => {
    for (const id of seanceData.clientList) {
      const newData = await getClientData(id);
      setAllClientData([...allClientData, newData]);
    }
  };

  useEffect(() => {
    if (seanceData.clientList?.length > 0) {
      setCompletedStep(true);
      getAllClientData();
    }
  }, [seanceData.clientList, setCompletedStep]);

  return (
    <div className={styles.AddClientsContainer}>
      <h2 className={styles.create_label}>
        Associer un ou plusieurs clients à la séances :{" "}
      </h2>
      {allClientData.map((client) => (
        <ClientCard key={client.id} id={client.id} circle={true} />
      ))}
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
