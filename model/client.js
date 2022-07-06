import {
  ref,
  set,
  child,
  get,
  update,
  startAt,
  endAt,
  orderByChild,
} from "firebase/database";
import { db, auth } from "../config/firebaseConfig";
import uniqid from "uniqid";

const user = auth.currentUser;

export async function createClient(clientData) {
  const id = uniqid();
  const creation_date = Date.now();
  if (user) {
    await set(ref(db, `clients/${user.uid}/${id}`), {
      ...clientData,
      id,
      creation_date,
    }).catch((error) => {
      console.log("Une erreur est survenue lors de l'enregistrement.") + error;
    });
    return id;
  }
}

export async function getClientData(clientId) {
  if (user) {
    try {
      const snapshot = await get(
        child(ref(db), `/clients/${user.uid}/${clientId}`)
      );
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export async function updateClient(clientId, data) {
  const last_update = Date.now();
  if (user) {
    update(ref(db, `clients/${user.uid}/${clientId}`), {
      ...data,
      last_update,
    });
  }
}

export async function getClientList(page = 0) {
  if (user) {
    try {
      const snapshot = await get(
        child(ref(db), `clients/${user.uid}`),
        orderByChild("creation_date"),
        startAt(page * 6),
        endAt(page * 6 + 6)
      );
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

export async function getThematic(thematic) {
  try {
    const snapshot = await get(child(ref(db), `/thematics/${thematic}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
