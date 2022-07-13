import {
  ref,
  set,
  child,
  get,
  update,
  orderByChild,
  query,
  remove,
} from "firebase/database";
import { db, auth } from "../config/firebaseConfig";
import uniqid from "uniqid";
import { getSeanceData, updateSeance } from "./seances";

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

export async function deleteClient(id) {
  const user = auth.currentUser;

  if (user) {
    const data = await getClientData(id);
    const deleteRef = ref(db, `clients/${user.uid}/${id}`);
    remove(deleteRef);

    for (const seanceID of data.seanceList) {
      const seanceData = await getSeanceData(seanceID);

      if (seanceData) {
        const index = seanceData.clientList?.indexOf(id);
        if (seanceData.clientList && seanceData?.clientList?.includes(id)) {
          delete seanceData.clientList[index];
          updateSeance(seanceID, {
            clientList: seanceData.clientList,
          });
        }
      }
    }
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
  const user = auth.currentUser;

  if (user) {
    update(ref(db, `clients/${user.uid}/${clientId}`), {
      ...data,
    });
  }
}

export async function getClientList() {
  const user = auth.currentUser;

  if (user) {
    try {
      const querySearch = [orderByChild("lastname")];
      const clientRef = ref(db, `clients/${user.uid}`);
      const snapshot = await get(query(clientRef, ...querySearch));
      if (snapshot.exists()) {
        const showClient = Object.keys(snapshot.val()).map(
          (client) => snapshot.val()[client]
        );
        return showClient.reverse();
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
