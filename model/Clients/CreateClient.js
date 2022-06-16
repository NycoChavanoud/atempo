import { ref, set } from "firebase/database";
import { db } from "../../config/firebaseConfig";
import uniqid from "uniqid";

export default function createClient(
  firstname,
  lastname,
  email,
  phoneNumber,
  problematic,
  adress
) {
  const clientId = uniqid();
  set(ref(db, "clients/" + clientId), {
    clientId,
    firstname,
    lastname,
    email,
    phoneNumber,
    problematic,
    adress,
  })
    .then(() => {
      console.log("Client sauvegardé.");
    })
    .catch((error) => {
      console.log("Une erreur est survenue lors de l'enregistrement.") + error;
    });
}
