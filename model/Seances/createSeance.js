import { ref, set } from "firebase/database";
import { db, auth } from "../../firebase/firebaseConfig";
import uniqid from "uniqid";

function createSeance(
  title,
  description = "",
  media_url,
  thematic_id,
  method_id,
  members = []
) {
  const sessionId = uniqid();
  const user = auth.currentUser;
  if (user !== null) {
    set(ref(db, `seances/${user.uid}/${sessionId}`), {
      title,
      description,
      media_url,
      thematic_id,
      method_id,
      members,
    });
  }
}

export default createSeance;
