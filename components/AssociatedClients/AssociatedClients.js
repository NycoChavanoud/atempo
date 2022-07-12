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
      <h2 className={styles.h2}>Clients associés</h2>

      <div className="flex flex-row">
        {clientList?.map((client) => (
          <ClientCard key={client.id} id={client.id} circle={true} />
        ))}
        <button onClick={handleOpen}>
          <AddCircleIcon
            sx={{
              color: "#DADADA",
              width: "90px",
              height: "90px",
              margin: "10px",
            }}
          />
        </button>
      </div>
      <LinkedClientModalUpdate
        open={open}
        onClose={handleClose}
        setLoadingData={setLoadingData}
      />
    </div>
  );
}
