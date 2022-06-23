import { ref, set, child, get } from "firebase/database";
import { db, auth } from "../config/firebaseConfig";
import uniqid from "uniqid";

export async function createClient(clientData) {
  const user = auth.currentUser;
  const id = uniqid();
  if (user) {
    await set(ref(db, `clients/${user.uid}/${id}`), {
      ...clientData,
      id,
    }).catch((error) => {
      console.log("Une erreur est survenue lors de l'enregistrement.") + error;
    });
    return id;
  }
}

export async function getClientData(clientId) {
  const user = auth.currentUser;

  if (user) {
    try {
      const snapshot = await get(
        child(ref(db), `/clients/${user.uid}/${clientId}`)
      );
      if (snapshot.exists()) {
        return await snapshot.val();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  } else return null;
}

export async function getClientList() {
  const user = auth.currentUser;

  if (user) {
    try {
      const snapshot = await get(child(ref(db), `clients/${user.uid}`));
      if (snapshot.exists()) {
        const showClient = Object.keys(snapshot.val()).map(
          (client) => snapshot.val()[client]
        );
        return showClient;
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
