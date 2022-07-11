import style from "./DesktopMenuAdmin.module.css";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DesktopMenuAdmin() {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <div className={style.bg}>
      <Avatar
        className={style.user}
        alt="votre photo"
        sx={{ width: 100, height: 100 }}
      />

      <div className={style.box}>
        <Link href="/adminDashboard">
          <div
            className={`${style.center} ${
              currentRoute === "/adminDashboard" ? "active" : ""
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
        <Link href="/adminClients">
          <div
            className={`${style.center} ${
              currentRoute === "/adminClients" ? "active" : ""
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
              <a>Clients</a>
            </div>
          </div>
        </Link>
        <Link href="/adminSeances">
          <div
            className={`${style.center} ${
              currentRoute === "/adminSeances" ? "active" : ""
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
        <Link href="/adminPractitiens">
          <div
            className={`${style.center} ${
              currentRoute === "/adminPractitiens" ? "active" : ""
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
          width: 25vw;
        }
      `}</style>
    </div>
  );
}
