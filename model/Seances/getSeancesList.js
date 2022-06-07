import { child, get } from "firebase/database";
import { db, auth } from "../../firebase/firebaseConfig";

function getSeancesList() {
  const user = auth.currentUser;

  if (user !== null) {
    get(child(db, `seances/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default getSeancesList;
