import style from "./deconnexion.module.css";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

const Deconnexion = ({ color }) => {
  const router = useRouter();
  const { logOut } = useAuth();

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
      <button
        className={style.btn}
        style={{ color: color }}
        type="submit"
        onClick={handleLogout}
      >
        Déconnexion
      </button>
    </div>
  );
};
export default Deconnexion;
