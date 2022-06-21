import {
  set,
  child,
  get,
  ref,
  startAt,
  endAt,
  update,
  orderByChild,
} from "firebase/database";
import { deleteObject, ref as refStorage, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../config/firebaseConfig";
import uniqid from "uniqid";

export async function createSeance(seanceData) {
  const user = auth.currentUser;
  const id = uniqid();
  const creation_date = Date.now();

  if (user !== null) {
    set(ref(db, `seances/${user.uid}/${id}`), {
      ...seanceData,
      id,
      creation_date,
    });
    return id;
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

export async function getSeancesList(page = 0) {
  const user = auth.currentUser;

  if (user !== null) {
    try {
      const snapshot = await get(
        child(ref(db), `seances/${user.uid}`),
        orderByChild("creation_date"),
        startAt(page * 6),
        endAt(page * 6 + 6)
      );

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
