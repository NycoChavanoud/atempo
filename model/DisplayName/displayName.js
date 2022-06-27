import { db, auth } from "../config/firebaseConfig";
import { child, get, ref } from "firebase/database";

export async function getFirstname() {
  const user = auth.currentUser;
  try {
    const snapshot = await get(
      child(ref(db), `/practitioners/${user.uid}/${user.firstname}`)
    );
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getLastname() {
  const user = auth.currentUser;
  try {
    const snapshot = await get(
      child(ref(db), `/practitioners/${user.uid}/${user.lastname}`)
    );
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.log(error);
  }
}
