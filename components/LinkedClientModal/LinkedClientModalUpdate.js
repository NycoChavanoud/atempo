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
import { useAuth } from "../../context/authContext";

export default function LinkedClientModalUpdate({
  open,
  onClose,
  setLoadingData,
}) {
  const [clientList, setClientList] = useState([]);
  const [selectedClientList, setSelectedClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateSeance(user, id, { clientList: selectedClientList });

    const selectedClientIDList = selectedClientList.map((client) => client.id);
    const currentClientIDList = clientList.map((client) => client.id);

    const removeClientIDList = [];

    currentClientIDList.forEach((clientID) => {
      if (!selectedClientIDList.includes(clientID))
        removeClientIDList.push(clientID);
    });

    for (const clientID of selectedClientIDList) {
      const clientData = await getClientData(user, clientID);
      let newSeanceList = [id];
      if (clientData.seanceList && !clientData.seanceList?.includes(id))
        newSeanceList = [...clientData.seanceList, id];
      if (clientData.seanceList && clientData.seanceList?.includes(id))
        newSeanceList = clientData.seanceList;
      updateClient(user, clientID, {
        seanceList: newSeanceList,
      });
    }

    for (const clientID of removeClientIDList) {
      const clientData = await getClientData(user, clientID);
      const index = clientData.seanceList?.indexOf(id);
      if (clientData.seanceList && clientData.seanceList?.includes(id)) {
        delete clientData.seanceList[index];
        updateClient(user, clientID, {
          seanceList: clientData.seanceList,
        });
      }
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
    getClientList(user)
      .then(setClientList)
      .then(() => setIsLoading(false));
  }, [id, isLoading, user]);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        {clientList?.length > 0 ? (
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
                {clientList?.map((client) => (
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
