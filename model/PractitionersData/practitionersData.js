import { db, auth } from "../../config/firebaseConfig";
import { child, get, ref } from "firebase/database";

export async function getAllPractitionersData() {
  const user = auth.currentUser;

  if (user) {
    try {
      const snapshot = await get(child(ref(db), `/practitioners/${user.uid}`));
      if (snapshot.exists()) {
        return snapshot.val();
      }
    } catch (error) {
      console.error(error);
    }
  } else return null;
}
