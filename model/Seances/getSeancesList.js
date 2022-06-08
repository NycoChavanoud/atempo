import { child, get, ref, startAt, endAt } from "firebase/database";
import { db } from "../../config/firebaseConfig";

export default async function getSeancesList(page = 0) {
  //   const user = auth.currentUser;

  //   if (user !== null) {
  //     get(child(db, `seances/${user.uid}`))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           return snapshot.val();
  //         } else {
  //           console.log("No data available");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }

  try {
    const snapshot = await get(
      child(ref(db), `/seances/0YyjBGd7xuZXmnqb460jGG0mWie2`),
      startAt(page * 6),
      endAt(page * 6 + 6)
    );

    if (snapshot.exists()) {
      const seanceTab = Object.keys(snapshot.val()).map(
        (seance) => snapshot.val()[seance]
      );
      console.log(seanceTab);
      return seanceTab;
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
