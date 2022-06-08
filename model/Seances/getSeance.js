import { child, get, ref } from "firebase/database";
import { db, auth } from "../../config/firebaseConfig";

export default async function getSeanceData(seanceId) {
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
