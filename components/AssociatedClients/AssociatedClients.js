import React from "react";
import styles from "./AssociatedClients.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Avatar } from "@mui/material";

export default function AssociatedClients() {
  return (
    <>
      <h2 className={styles.h2}>Clients associés</h2>

      <div className="flex flex-row">
        <Avatar
          sx={{
            backgroundColor: "#FF9083",
            width: "90px",
            height: "90px",
            margin: "10px",
          }}
        />
        <Avatar
          sx={{
            backgroundColor: "#FF9083",
            width: "90px",
            height: "90px",
            margin: "10px",
          }}
        />
        <AddCircleIcon
          sx={{
            color: "#DADADA",
            width: "90px",
            height: "90px",
            margin: "10px",
          }}
        />
      </div>
    </>
  );
}
