import { db } from "../../config/firebaseConfig";
import { child, get, ref, update } from "firebase/database";

// Pour appeler les données de la base de données du praticien
export async function getAllPractitionersData(user) {
  try {
    const snapshot = await get(child(ref(db), `/practitioners/${user.uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
}

// Pour modifier les données de la base de données du praticien sur la page modif profil
export async function updatePractitionersData(user, data) {
  const last_update = Date.now();
  if (user && data) {
    update(ref(db, `practitioners/${user.uid}`), {
      ...data,
      last_update,
    });
  }
}

// Pour récupérer les données de google à la connexion
export async function updateDataIfGoogleSignIn(user) {
  if (user.displayName) {
    const googleData = {
      firstname: user.displayName.split(" ")[0],
      lastname: user.displayName.split(" ")[1],
      email: user.email,
      photoURL: user.photoURL,
    };
    await updatePractitionersData(user, googleData);
  }
}
