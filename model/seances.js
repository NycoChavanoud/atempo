import {
  set,
  child,
  get,
  ref,
  update,
  orderByChild,
  push,
  query,
  remove,
} from "firebase/database";
import {
  deleteObject,
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../config/firebaseConfig";
import { getClientData, updateClient } from "./client";

/** Créer une séance.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {object} - seanceData - enregistrements des données de la séance
 * @return {string} - retourne l'identifiant de la séance créée.
 */

export async function createSeance(user, seanceData) {
  const creation_date = Date.now();

  const seanceRef = ref(db, `seances/${user.uid}`);
  const newSeanceRef = push(seanceRef);
  set(newSeanceRef, {
    ...seanceData,
    id: newSeanceRef.key,
    creation_date,
  });

  const seance_nb = await getSeanceNumber(user);
  update(ref(db, `practitioners/${user.uid}`), { seance_nb: seance_nb + 1 });

  return newSeanceRef.key;
}

/** Supprimer une séance.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {string} - id - récupère l'identifiant de la séance ciblée.
 */

export async function deleteSeance(user, id) {
  try {
    const data = await getSeanceData(user, id);

    const deletedRef = ref(db, `seances/${user.uid}/${id}`);
    remove(deletedRef);

    const seance_nb = await getSeanceNumber(user);
    update(ref(db, `practitioners/${user.uid}`), { seance_nb: seance_nb - 1 });

    if (data.clientList) {
      for (const client of data.clientList) {
        const clientData = getClientData(user, client.id);

        const index = clientData?.seanceList?.indexOf(id);
        if (clientData.seanceList && clientData?.seanceList?.includes(id)) {
          delete clientData.seanceList[index];
          updateClient(user, client.id, {
            seanceList: clientData.seanceList,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

/** Récupérer le nombre de séances.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @return {number} - retourne le nombre de clients.
 */

export async function getSeanceNumber(user) {
  const seance_nb = await get(ref(db, `practitioners/${user.uid}/seance_nb`));

  if (seance_nb) {
    return seance_nb.val();
  } else return 0;
}

/** Mise à jour des information d'une séance.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {string} - sessionId - récupère l'identifiant de la séance ciblée.
 * @param {object} - data - informations de la séance.
 */

export async function updateSeance(user, sessionId, data) {
  const last_update = Date.now();
  update(ref(db, `seances/${user.uid}/${sessionId}`), {
    ...data,
    last_update,
  });
}

/** Récupère les informations d'une séance.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {string} - seanceId - récupère l'identifiant de la séance ciblée.
 * @return {object} - retourne les différentes informations de la séance.
 */

export async function getSeanceData(user, seanceId) {
  try {
    const snapshot = await get(
      child(ref(db), `/seances/${user.uid}/${seanceId}`)
    );
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
}

/** Récupère l'ensemble des séances du praticien connecté.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @return {array} - retourne un tableau regroupant toutes les séances.
 */

export async function getSeancesList(user) {
  try {
    const queryConstraints = [orderByChild("creation_date")];
    const seancesRef = ref(db, `seances/${user.uid}`);
    const snapshot = await get(query(seancesRef, ...queryConstraints));
    if (snapshot.exists()) {
      const seanceTab = Object.keys(snapshot.val()).map(
        (seance) => snapshot.val()[seance]
      );
      return seanceTab.reverse();
    }
  } catch (error) {
    console.error(error);
  }
}

/** Récupère les couleurs des différentes thématiques.
 * @param {object} - thematic - récupère la thématique appelée par le formulaire
 * @return {object} - retourne la couleur liée à la thématique appelée.
 */

export async function getThematic(thematic) {
  try {
    const snapshot = await get(child(ref(db), `/thematics/${thematic}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
}

/** Récupère l'ensemble des thématiques.
 * @return {array} - retourne un tableau regroupant toutes les thématiques.
 */

export async function getThematicList() {
  try {
    const snapshot = await get(child(ref(db), `thematics`));

    if (snapshot.exists()) {
      const thematics = Object.keys(snapshot.val()).map(
        (t) => snapshot.val()[t]
      );
      return thematics;
    }
  } catch (error) {
    console.error(error);
  }
}

/** Récupère les couleurs des différentes method.
 * @param {object} - method - récupère la méthode appelée par le formulaire
 * @return {object} - retourne la couleur liée à la méthode appelée.
 */

export async function getMethod(method) {
  try {
    const snapshot = await get(child(ref(db), `/methods/${method}`));
    if (snapshot.exists()) {
      return await snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
}

/** Récupère l'ensemble des méthodes.
 * @return {array} - retourne un tableau regroupant toutes les méthodes.
 */

export async function getMethodList() {
  try {
    const snapshot = await get(child(ref(db), `methods`));

    if (snapshot.exists()) {
      const methods = Object.keys(snapshot.val()).map((m) => snapshot.val()[m]);
      return methods;
    }
  } catch (error) {
    console.error(error);
  }
}

/** Enregistrement d'un média.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {blob} - file - séléction du média.
 * @param {string} - seanceId - récupère l'identifiant de la séance ciblée.
 * @param {string} - fileName - nom du média concerné.
 * @return {array} - retourne un tableau regroupant toutes les méthodes.
 */

export function postSeanceMedia(user, file, seanceId, fileName) {
  const storageRef = refStorage(
    storage,
    `practitioners/${user.uid}/seances/${seanceId}/${fileName}`
  );
  uploadBytes(storageRef, file);
  return storageRef._location.path_;
}

/** Suppression d'un média.
 * @param {string} - oldMediaUrl - l'url du média à supprimer.
 */

export function deleteSeanceMedia(oldMediaUrl) {
  const oldStorageRef = refStorage(storage, oldMediaUrl);
  deleteObject(oldStorageRef);
}

/** Modification d'un média.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {blob} - file - séléction du média.
 * @param {string} - seanceId - récupère l'identifiant de la séance ciblée.
 * @param {string} - fileName - nom du média concerné.
 * @param {string} - oldMediaUrl - l'url du média concerné à supprimer.
 * @return {string} - retourne l'url du nouveau média.
 */

export async function updateSeanceMedia(
  user,
  file,
  seanceId,
  fileName,
  oldMediaUrl
) {
  const newMediaUrl = postSeanceMedia(user, file, seanceId, fileName);
  deleteSeanceMedia(oldMediaUrl);
  return newMediaUrl;
}

/** Récupération d'un média.
 * @param {string} - media_url - cible l'url du média selectionné.
 */

export async function getSeanceMediaUrl(media_url) {
  try {
    const storageRef = refStorage(storage, media_url);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    switch (error.code) {
      case "storage/object-not-found":
        // File doesn't exist
        console.error("File doesn't exist");
        break;
      case "storage/unauthorized":
        //
        console.error("User doesn't have permission to access the object");

        break;
      case "storage/canceled":
        // User canceled the upload
        console.error(" User canceled the upload");

        break;
      case "storage/unknown":
        // Unknown error occurred, inspect the server response
        console.error(" Unknown error occurred, inspect the server response");

        break;
    }
  }
}
