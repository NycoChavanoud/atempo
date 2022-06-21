import { ref, set } from "firebase/database";
import { db } from "../config/firebaseConfig";
import uniqid from "uniqid";

export function createClient(clientData) {
  const clientId = uniqid();
  set(ref(db, "clients/" + clientId), {
    ...clientData,
    clientId,
  }).catch((error) => {
    console.log("Une erreur est survenue lors de l'enregistrement.") + error;
  });
  return clientId;
}
