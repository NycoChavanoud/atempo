import { child, get, ref } from "firebase/database";
import { db } from "../../config/firebaseConfig";

export default async function getSeanceData(seanceId) {
  //   const user = auth.currentUser;

  //   if (user !== null) {
  //     get(child(db, `seances/${user.uid}/${seanceId}`))
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
  try {
    const snapshot = await get(
      child(ref(db), `/seances/0YyjBGd7xuZXmnqb460jGG0mWie2/${seanceId}`)
    );

    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
