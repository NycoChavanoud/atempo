import { ref, set, update, child } from "firebase/database";
import { db } from "../config/firebaseConfig";
import uniqid from "uniqid";
import { get } from "http";

export function createClient(clientData) {
  const clientId = uniqid();

  set(ref(db, "clients/" + clientId), {
    ...clientData,
    clientId,
  }).catch((error) => {
    console.log("Une erreur est survenue lors de l'enregistrement.") + error;
  });
}

export function updateSeance(clientId, data) {
  update(ref(db, `clients/${clientId}`), data);
}

export async function getClientData(clientId) {
  try {
    const snapshot = await get(child(ref(db), `clients/${clientId}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      alert("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
