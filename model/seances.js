import { set, child, get, ref, startAt, endAt } from "firebase/database";
import { ref as refStorage, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../config/firebaseConfig";

export async function createSeance(
  title,
  description = "",
  media_url,
  thematic_id,
  method_id,
  members = [],
  sessionId
) {
  const user = auth.currentUser;
  if (user !== null) {
    set(ref(db, `seances/${user.uid}/${sessionId}`), {
      title,
      description,
      media_url,
      thematic_id,
      method_id,
      members,
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
        startAt(page * 6),
        endAt(page * 6 + 6)
      );

      if (snapshot.exists()) {
        const seanceTab = Object.keys(snapshot.val()).map(
          (seance) => snapshot.val()[seance]
        );
        return seanceTab;
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  } else return null;
}

export async function getThematic(thematicId) {
  try {
    const snapshot = await get(child(ref(db), `/thematics/${thematicId}`));
    if (snapshot.exists()) {
      return snapshot.val();
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

export async function getMethod(methodId) {
  try {
    const snapshot = await get(child(ref(db), `/methods/${methodId}`));
    if (snapshot.exists()) {
      return snapshot.val();
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

export async function postSeanceMedia(filePath, seanceId, fileName) {
  const user = auth.currentUser;

  if (user !== null) {
    const storageRef = refStorage(
      storage,
      `${user.id}/${seanceId}/${fileName}`
    );
    uploadBytes(storageRef, filePath);
    return storageRef;
  }
}
