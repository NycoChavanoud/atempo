import { db, auth } from "../../config/firebaseConfig";
import { child, get, ref, update } from "firebase/database";

export async function getAllPractitionersData() {
  const user = auth.currentUser;
  if (user) {
    try {
      const snapshot = await get(child(ref(db), `/practitioners/${user.uid}`));
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

export async function updatePractitionersData(data) {
  const user = auth.currentUser;
  const last_update = Date.now();
  if (user) {
    update(ref(db, `practitioners/${user.uid}`), {
      ...data,
      last_update,
    });
  }
}
