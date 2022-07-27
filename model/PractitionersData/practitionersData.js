import { db } from "../../config/firebaseConfig";
import { child, get, ref, update } from "firebase/database";

export async function getAllPractitionersData(user) {
  if (user) {
    try {
      const snapshot = await get(child(ref(db), `/practitioners/${user.uid}`));
      if (snapshot.exists()) {
        return snapshot.val();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export async function updatePractitionersData(user, data) {
  const last_update = Date.now();
  if (user && data) {
    update(ref(db, `practitioners/${user.uid}`), {
      ...data,
      last_update,
    });
  }
}

export async function updateDataIfGoogleSignIn(user) {
  if (user.displayName) {
    const googleData = {
      firstname: user.displayName.split(" ")[0],
      lastname: user.displayName.split(" ")[1],
      email: user.email,
      photoURL: user.photoURL,
      client_nb: 0,
      seance_nb: 0,
    };
    await updatePractitionersData(user, googleData);
  }
}
