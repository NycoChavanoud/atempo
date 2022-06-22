import { ref, set, update, child } from "firebase/database";
import { db } from "../config/firebaseConfig";
import uniqid from "uniqid";
import { get } from "http";

export function createClient(clientData) {
  const id = uniqid();

  set(ref(db, "clients/" + id), {
    ...clientData,
    id,
  }).catch((error) => {
    console.log("Une erreur est survenue lors de l'enregistrement.") + error;
  });
}

export function updateSeance(id, data) {
  update(ref(db, `clients/${id}`), data);
}

export async function getClientData(id) {
  try {
    const snapshot = await get(child(ref(db), `clients/${id}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      alert("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
