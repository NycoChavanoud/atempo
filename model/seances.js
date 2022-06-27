import {
  set,
  child,
  get,
  ref,
  update,
  orderByChild,
  push,
  query,
  limitToLast,
  endAt,
} from "firebase/database";
import { deleteObject, ref as refStorage, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../config/firebaseConfig";

export async function createSeance(seanceData) {
  const user = auth.currentUser;
  const creation_date = Date.now();

  if (user) {
    const seanceRef = ref(db, `seances/${user.uid}`);
    const newSeanceRef = push(seanceRef);
    set(newSeanceRef, {
      ...seanceData,
      id: newSeanceRef.key,
      creation_date,
    });

    const seance_nb = await getSeanceNumber();
    update(ref(db, `practitioners/${user.uid}`), { seance_nb: seance_nb + 1 });

    return newSeanceRef.key;
  }
}

export async function getSeanceNumber() {
  const user = auth.currentUser;
  const seance_nb = await get(ref(db, `practitioners/${user.uid}/seance_nb`));

  if (seance_nb) {
    return seance_nb.val();
  }
}

export async function updateSeance(sessionId, data) {
  const user = auth.currentUser;
  const last_update = Date.now();
  if (user !== null) {
    update(ref(db, `seances/${user.uid}/${sessionId}`), {
      ...data,
      last_update,
    });
  }
}

export async function getSeanceData(seanceId) {
  const user = auth.currentUser;

  if (user !== null) {
    try {
      const snapshot = await get(
        child(ref(db), `/seances/${user.uid}/${seanceId}`)
      );
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  } else return null;
}

export async function getSeancesList(page, lastDate, limit = 6) {
  const user = auth.currentUser;
  if (!lastDate || page === 1) lastDate = Date.now();
  else lastDate = lastDate - 2000;

  if (user) {
    try {
      const queryConstraints = [
        orderByChild("creation_date"),
        endAt(lastDate, "creation_date"),
        limitToLast(limit),
      ];
      const seancesRef = ref(db, `seances/${user.uid}`);
      const snapshot = await get(query(seancesRef, ...queryConstraints));
      if (snapshot.exists()) {
        const seanceTab = Object.keys(snapshot.val()).map(
          (seance) => snapshot.val()[seance]
        );
        return seanceTab.reverse();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  } else return null;
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

export async function getThematicList() {
  try {
    const snapshot = await get(child(ref(db), `thematics`));

    if (snapshot.exists()) {
      const thematics = Object.keys(snapshot.val()).map(
        (t) => snapshot.val()[t]
      );
      return thematics;
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getMethod(method) {
  try {
    const snapshot = await get(child(ref(db), `/methods/${method}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getMethodList() {
  try {
    const snapshot = await get(child(ref(db), `methods`));

    if (snapshot.exists()) {
      const methods = Object.keys(snapshot.val()).map((m) => snapshot.val()[m]);
      return methods;
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

export function postSeanceMedia(file, seanceId, fileName) {
  const user = auth.currentUser;

  if (user !== null) {
    const storageRef = refStorage(
      storage,
      `practitioners/${user.uid}/seances/${seanceId}/${fileName}`
    );
    uploadBytes(storageRef, file);
    return storageRef._location.path_;
  }
}

export function deleteSeanceMedia(oldMediaUrl) {
  const user = auth.currentUser;

  if (user !== null) {
    const oldStorageRef = refStorage(storage, oldMediaUrl);
    deleteObject(oldStorageRef);
  }
}

export async function updateSeanceMedia(file, seanceId, fileName, oldMediaUrl) {
  const newMediaUrl = postSeanceMedia(file, seanceId, fileName);
  deleteSeanceMedia(oldMediaUrl);
  return newMediaUrl;
}
