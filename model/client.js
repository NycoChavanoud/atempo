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
import { db } from "../config/firebaseConfig";
import uniqid from "uniqid";
import { getSeanceData, updateSeance } from "./seances";

export async function createClient(user, clientData) {
  const id = uniqid();
  const creation_date = Date.now();

  if (user) {
    await set(ref(db, `clients/${user.uid}/${id}`), {
      ...clientData,
      id,
      creation_date,
    }).catch((error) => {
      console.error(error);
    });
    return id;
  }

  const client_nb = await getClientNumber(user);
  update(ref(db, `practitioners/${user.uid}`), { client_nb: client_nb + 1 });
}

export async function getClientNumber(user) {
  const seance_nb = await get(ref(db, `clients/${user.uid}/client_nb`));

  if (seance_nb) {
    return seance_nb.val();
  }
}

export async function deleteClient(user, id) {
  if (user) {
    const data = await getClientData(id);
    const deleteRef = ref(db, `clients/${user.uid}/${id}`);
    remove(deleteRef);

    const client_nb = await getClientNumber(user);
    update(ref(db, `practitioners/${user.uid}`), { client_nb: client_nb - 1 });

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

export async function getClientData(user, clientId) {
  if (user) {
    try {
      const snapshot = await get(
        child(ref(db), `/clients/${user.uid}/${clientId}`)
      );
      if (snapshot.exists()) {
        return snapshot.val();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export async function updateClient(user, clientId, data) {
  const last_update = Date.now();

  if (user) {
    update(ref(db, `clients/${user.uid}/${clientId}`), {
      ...data,
      last_update,
    });
  }
}

export async function getClientList(user) {
  try {
    const querySearch = [orderByChild("lastname")];
    const clientRef = ref(db, `clients/${user.uid}`);
    const snapshot = await get(query(clientRef, ...querySearch));
    if (snapshot.exists()) {
      const showClient = Object.keys(snapshot.val()).map(
        (client) => snapshot.val()[client]
      );
      return showClient.reverse();
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getThematic(thematic) {
  try {
    const snapshot = await get(child(ref(db), `/thematics/${thematic}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
}
