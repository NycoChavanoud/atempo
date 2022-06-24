import style from "./Account.module.css";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";
import { auth } from "../../config/firebaseConfig";

const Account = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const user = auth.currentUser;
  console.log(auth);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.accountContainer}>
      <p className={style.p}>{user && user.email}</p>
      <button className={style.btn} type="submit" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};
export default Account;
