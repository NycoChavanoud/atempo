import { db } from "../config/firebaseConfig";
import { child, get, ref } from "firebase/database";

export async function getAllPractitionersDataAdmin() {
  try {
    const snapshot = await get(child(ref(db), `/practitioners`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function practitionersData() {
  const ref = db.ref(`/practitioners`);

  ref.on(
    "value",
    (snapshot) => {
      console.log(snapshot.val());
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
}
