import style from "./account.module.css";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

const Account = () => {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.accountContainer}>
      <h1 className={style.title}>Compte Utilisateur</h1>
      <p className={style.p}>Email utilisateur : {user && user.email}</p>

      <button className={style.btn} type="submit" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};

export default Account;
