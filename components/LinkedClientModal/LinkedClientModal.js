import React, { useContext, useEffect, useState } from "react";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import { getClientList } from "../../model/client";
import { Box } from "@mui/system";
import createSeanceContext from "../../context/createSeanceContext";
import styles from "./LinkedClientModal.module.css";
import { useAuth } from "../../context/authContext";

export default function LinkedClientModal({ open, onClose }) {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClientList, setSelectedClientList] = useState([]);
  const { seanceData, setSeanceData } = useContext(createSeanceContext);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedClientList.length > 0) {
      setSeanceData({ ...seanceData, clientList: selectedClientList });
      onClose();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (selectedClientList.includes(e.target.value) === false)
      setSelectedClientList(
        typeof value === "string" ? value.split(",") : value
      );
  };

  useEffect(() => {
    getClientList(user)
      .then(setClientList)
      .then(() => setIsLoading(false));
  }, [isLoading, user]);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        {!isLoading ? (
          <form onSubmit={handleSubmit} className={styles.modale}>
            <h2>Sélectionner les patients à associer :</h2>{" "}
            <FormControl>
              <InputLabel id="demo-multiple-chip-label">
                Patient.es associé.es
              </InputLabel>
              <Select
                className={styles.select}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedClientList}
                onChange={handleChange}
                input={<OutlinedInput label="Patient.es associé.es" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((client) => (
                      <Chip
                        key={client.id}
                        label={`${client.firstname} ${client.lastname}`}
                      />
                    ))}
                  </Box>
                )}
              >
                {clientList?.map((client) => (
                  <MenuItem key={client.id} value={client}>
                    {`${client.firstname} ${client.lastname}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={styles.btn_container}>
              <button
                className={`${styles.btn} ${styles.confirmation}`}
                type="submit"
              >
                Confirmer
              </button>
              <button
                className={`${styles.btn} ${styles.annulation}`}
                onClick={onClose}
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.modale}>
            <p>Vous n&apos;avez pas encore enregistré de patient !</p>
            <div className={styles.btn_container}>
              <button
                className={`${styles.btn} ${styles.annulation}`}
                onClick={onClose}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
