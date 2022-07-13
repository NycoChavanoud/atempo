import React, { useEffect, useState } from "react";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import { getClientData, getClientList, updateClient } from "../../model/client";
import { updateSeance } from "../../model/seances";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import styles from "./LinkedClientModal.module.css";

export default function LinkedClientModalUpdate({
  open,
  onClose,
  setLoadingData,
}) {
  const [clientList, setClientList] = useState([]);
  const [selectedClientList, setSelectedClientList] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async () => {
    updateSeance(id, { clientList: selectedClientList });

    const clientIDList = clientList.map((client) => client.id);

    for (const clientID of clientIDList) {
      const clientData = await getClientData(clientID);
      let newSeanceList = [id];
      if (clientData.seanceList) newSeanceList = [...clientData.seanceList, id];
      updateClient(clientID, {
        seanceList: newSeanceList,
      });
    }

    setLoadingData(true);
    onClose();
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!selectedClientList.includes(value))
      setSelectedClientList(
        typeof value === "string" ? value.split(",") : value
      );
  };

  useEffect(() => {
    getClientList().then(setClientList);
  }, [id]);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <form onSubmit={handleSubmit} className={styles.modale}>
          <h2>Sélectionner les patients à associer :</h2>
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
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedClientList.map((client) => (
                    <Chip
                      key={client.id}
                      label={`${client.firstname} ${client.lastname}`}
                    />
                  ))}
                </Box>
              )}
            >
              {clientList.map((client) => (
                <MenuItem key={client.id} value={client}>
                  {`${client.firstname} ${client.lastname}`}
                </MenuItem>
              ))}
            </Select>{" "}
          </FormControl>{" "}
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
      </Modal>
    </div>
  );
}
