import style from "./DesktopMenu.module.css";
import Avatar from "../../components/Avatar/Avatar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Deconnexion from "../Deconnexion/Deconnexion";
import { useAuth } from "../../context/authContext";

export default function DesktopMenu() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { user } = useAuth();
  return (
    <div className={style.bg}>
      <div className={style.user}>
        <Avatar src={user.photoURL} />
      </div>

      <div className={style.box}>
        <Link href="/dashboard">
          <div
            className={`${style.center} ${
              currentRoute === "/dashboard" ? "active" : ""
            }`}
          >
            <div className={style.link}>
              <Image
                priority
                height={40}
                width={45}
                src="/images/dashboard.png"
                alt="deux tableaux de bord"
              />
              <a>Tableau de bord</a>
            </div>
          </div>
        </Link>
        <Link href="/clients">
          <div
            className={`${style.center} ${
              currentRoute === "/clients" ? "active" : ""
            }`}
          >
            <div className={style.link}>
              <Image
                priority
                height={40}
                width={45}
                src="/images/clients.png"
                alt="deux coeurs"
              />
              <a>Patients</a>
            </div>
          </div>
        </Link>
        <Link href="/seances">
          <div
            className={`${style.center} ${
              currentRoute === "/seances" ? "active" : ""
            }`}
          >
            <div className={style.link}>
              <Image
                priority
                height={50}
                width={50}
                src="/images/stars.png"
                alt="deux étoiles"
              />
              <a>Séances</a>
            </div>
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`${style.center} ${
              currentRoute === "/profile" ? "active" : ""
            }`}
          >
            <div className={style.link}>
              <Image
                priority
                height={40}
                width={40}
                src="/images/profil.png"
                alt="icones profils d'utilisateurs"
              />
              <a>Profil</a>
            </div>
          </div>
        </Link>
      </div>
      <style jsx>{`
        .active {
          background: white;
          color: var(--main-bg-color);
          border-radius: 80px 0 0 80px;
        }
      `}</style>

      <Deconnexion color="white" />
    </div>
  );
}
