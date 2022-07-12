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
import { getClientList } from "../../model/client";
import { updateSeance } from "../../model/seances";
import { useRouter } from "next/router";
import { Box } from "@mui/system";

export default function LinkedClientModalUpdate({
  open,
  onClose,
  setLoadingData,
}) {
  const [clientList, setClientList] = useState([]);
  const [selectedClientList, setSelectedClientList] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = () => {
    updateSeance(id, { clientList: selectedClientList });
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
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "250px",
            backgroundColor: "white",
            boxShadow: 50,
            borderRadius: "20px",
            textAlign: "justify",
            padding: 25,
          }}
        >
          {" "}
          <form onSubmit={handleSubmit}>
            <h2>Sélectionner les patients à associer :</h2>
            <FormControl>
              <InputLabel id="demo-multiple-chip-label">
                Patient.es associé.es
              </InputLabel>
              <Select
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
              <div>
                <button type="submit">Confirmer</button>
                <button onClick={onClose}>Annuler</button>
              </div>
            </FormControl>{" "}
          </form>
        </div>
      </Modal>
    </div>
  );
}
