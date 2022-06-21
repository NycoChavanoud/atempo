import { ref, set } from "firebase/database";
import { db, auth } from "../config/firebaseConfig";
import uniqid from "uniqid";

export function createClient(clientData) {
  const user = auth.currentUser;
  const clientId = uniqid();
  if (user !== null) {
    set(ref(db, "clients/" + clientId), {
      ...clientData,
      clientId,
    }).catch((error) => {
      console.log("Une erreur est survenue lors de l'enregistrement.") + error;
    });
    return clientId;
  }
}
