import React, { useState } from "react";
import styles from "./AssociatedClients.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LinkedClientModalUpdate from "../LinkedClientModal/LinkedClientModalUpdate";
import ClientCard from "../ClientCard/ClientCard";

export default function AssociatedClients({ clientList, setLoadingData }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="mt-5 mb-5">
      <h2 className={styles.h2}>Patient.es associé.es :</h2>

      <div className="flex flex-row justify-center items-center ">
        <button onClick={handleOpen}>
          <AddCircleIcon
            sx={{
              color: "#DADADA",
              width: "90px",
              height: "90px",
              margin: "10px",
            }}
          />
        </button>{" "}
        <div className="flex flex-row overflow-x-auto justify-between">
          {clientList?.map((client) => (
            <ClientCard key={client.id} id={client.id} circle={true} />
          ))}
        </div>
      </div>
      <LinkedClientModalUpdate
        open={open}
        onClose={handleClose}
        setLoadingData={setLoadingData}
      />
    </div>
  );
}
