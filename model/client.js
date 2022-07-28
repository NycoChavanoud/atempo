import {
  ref,
  set,
  child,
  get,
  update,
  orderByChild,
  query,
  remove,
} from "firebase/database";
import { db } from "../config/firebaseConfig";
import uniqid from "uniqid";
import { getSeanceData, updateSeance } from "./seances";

/** Créer un client.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {object} - clientData - enregistrement des données clients.
 * @return {string} - retourne l'identifiant du client créé.
 */

export async function createClient(user, clientData) {
  const id = uniqid();
  const creation_date = Date.now();

  if (user) {
    try {
      await set(ref(db, `clients/${user.uid}/${id}`), {
        ...clientData,
        id,
        creation_date,
      });

      const client_nb = await getClientNumber(user);
      update(ref(db, `practitioners/${user.uid}`), {
        client_nb: client_nb + 1,
      });

      return id;
    } catch (error) {
      console.error(error);
    }
  }
}

/** Récupérer le nombre de clients.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @return {number} - retourne le nombre de clients.
 */

export async function getClientNumber(user) {
  const client_nb = await get(ref(db, `practitioners/${user.uid}/client_nb`));
  if (client_nb) {
    return client_nb.val();
  } else return 0;
}

/** Supprimer un client.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {string} - id - récupère l'identifiant du client ciblé.
 */

export async function deleteClient(user, id) {
  if (user) {
    const data = await getClientData(user, id);
    const deleteRef = ref(db, `clients/${user.uid}/${id}`);
    remove(deleteRef);

    const client_nb = await getClientNumber(user);
    update(ref(db, `practitioners/${user.uid}`), { client_nb: client_nb - 1 });

    if (data.seanceList) {
      for (const seanceID of data.seanceList) {
        const seanceData = await getSeanceData(user, seanceID);

        if (seanceData) {
          const index = seanceData.clientList?.indexOf(id);
          if (seanceData.clientList && seanceData?.clientList?.includes(id)) {
            delete seanceData.clientList[index];
            updateSeance(user, seanceID, {
              clientList: seanceData.clientList,
            });
          }
        }
      }
    }
  }
}

/** Récupère les informations d'un client.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {string} - id - récupère l'identifiant du client ciblé.
 * @return {object} - retourne les différentes informations du client.
 */

export async function getClientData(user, id) {
  if (user) {
    try {
      const snapshot = await get(child(ref(db), `/clients/${user.uid}/${id}`));
      if (snapshot.exists()) {
        return snapshot.val();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

/** Mise à jour des information d'un client.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @param {string} - id - récupère l'identifiant du client ciblé.
 * @param {object} - data - informations du client.
 */

export async function updateClient(user, id, data) {
  const last_update = Date.now();

  if (user) {
    update(ref(db, `clients/${user.uid}/${id}`), {
      ...data,
      last_update,
    });
  }
}

/** Récupère l'ensemble des clients du praticien connecté.
 * @param {object} - user - confirmation de la connection d'un praticien.
 * @return {array} - retourne un tableau regroupant tous les clients.
 */

export async function getClientList(user) {
  try {
    const querySearch = [orderByChild("lastname")];
    const clientRef = ref(db, `clients/${user.uid}`);
    const snapshot = await get(query(clientRef, ...querySearch));
    if (snapshot.exists()) {
      const showClient = Object.keys(snapshot.val()).map(
        (client) => snapshot.val()[client]
      );
      return showClient.reverse();
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
