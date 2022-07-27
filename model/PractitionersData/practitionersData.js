import { db } from "../../config/firebaseConfig";
import { child, get, ref, update } from "firebase/database";

/** Pour appeler les données de la base de données du praticien :
 * @param {String} - user  - Confirmation de la connexion d'un praticien.
 * @return {Objet} - Retourne les valeurs (infos) du praticien
 */
export async function getAllPractitionersData(user) {
  if (user) {
    try {
      const snapshot = await get(child(ref(db), `/practitioners/${user.uid}`));
      if (snapshot.exists()) {
        return snapshot.val();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

/** Pour modifier les données de la base de données du praticien sur la page modif profil :
 * @param {String} - user  - Confirmation de la connexion d'un praticien.
 * @param {Objet} - data - les données du praticien
 **/
export async function updatePractitionersData(user, data) {
  const last_update = Date.now();
  if (user && data) {
    update(ref(db, `practitioners/${user.uid}`), {
      ...data,
      last_update,
    });
  }
}

/** Pour récupérer les données de google à la connexion :
 * @param {String} - user  - Confirmation de la connexion d'un praticien.
 * @param {Objet} - googleData - les données de Google du praticien
 **/
export async function updateDataIfGoogleSignIn(user) {
  if (user.displayName) {
    const googleData = {
      firstname: user.displayName.split(" ")[0],
      lastname: user.displayName.split(" ")[1],
      email: user.email,
      photoURL: user.photoURL,
      client_nb: 0,
      seance_nb: 0,
    };
    await updatePractitionersData(user, googleData);
  }
}
