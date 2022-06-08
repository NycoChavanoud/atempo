import { child, get, ref, startAt, endAt } from "firebase/database";
import { auth, db } from "../../config/firebaseConfig";

export default async function getSeancesList(page = 0) {
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
