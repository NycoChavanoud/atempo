import style from "../DisplayCurrentUser/DisplayCurrentUser.module.css";
import { auth } from "../../config/firebaseConfig";
import { get, ref } from "firebase/database";
import { db } from "../../config/firebaseConfig";

const DisplayCurrentUser = () => {
  const user = auth.currentUser;
  console.log(user);
  if (user) {
    get(ref(db, `practitioners/${user.uid}/${user.firstname}`));
    get(ref(db, `practitioners/${user.uid}/${user.lastname}`));
  }

  return (
    <div className={style.displayCurrentUserContainer}>
      <p className={style.displayUser}>
        {user?.auth?.currentUser?.displayName}
      </p>
    </div>
  );
};

export default DisplayCurrentUser;
