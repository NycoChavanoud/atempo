import React, { useEffect, useState } from "react";
import styles from "./AssociatedClients.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LinkedClientModalUpdate from "../LinkedClientModal/LinkedClientModalUpdate";
import { getClientData } from "../../model/client";
import ClientCard from "../ClientCard/ClientCard";

export default function AssociatedClients({ clientList }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [allClientData] = useState([]);

  const getAllClientData = async () => {
    if (clientList?.length > 0) {
      for (const id of clientList) {
        const data = await getClientData(id);
        allClientData.push(data);
      }
    }
  };

  useEffect(() => {
    getAllClientData();
  }, [clientList]);

  return (
    <div className="mt-5 mb-5">
      <h2 className={styles.h2}>Clients associés</h2>

      <div className="flex flex-row">
        {allClientData.map((client) => (
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
        selectedClients={allClientData}
      />
    </div>
  );
}
