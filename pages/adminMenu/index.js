import style from "./admin.module.css";
import WaveAdminCross from "../../components/WaveAdminCross/WaveAdminCross";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Account from "../../components/Account/Account";
import DesktopMenuAdmin from "../../components/DesktopMenuAdmin/DesktopMenuAdmin";

export default function admin() {
  return (
    <Layout pageTitle="Menu">
      <div className={style.desktopMenu}>
        <DesktopMenuAdmin />
      </div>
      <WaveAdminCross />

      <div className={style.container}>
        <Avatar
          className={style.user}
          alt="votre photo"
          sx={{ width: 100, height: 100 }}
        />

        <Link href="/seances/createFromMenu">
          <button className={style.button}>Créer une séance</button>
        </Link>
      </div>
      <div className={style.links}>
        <Link data-cy="dashboardBtn" href="/adminDashboard">
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={40}
                width={45}
                src="/images/dashboard.png"
                alt="deux tableaux de bord"
              />
            </div>
            <a className={style.text}>Tableau de bord</a>
            <div className={style.arrow}>
              <Image
                priority
                height={20}
                width={10}
                src="/images/right_arrow.png"
                alt="flèche vers la droite"
              />
            </div>
          </div>
        </Link>

        <Link href="/adminClients">
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={40}
                width={45}
                src="/images/clients.png"
                alt="deux coeurs"
              />
            </div>
            <a className={style.text}>Clients</a>
            <div className={style.arrow}>
              <Image
                priority
                height={20}
                width={10}
                src="/images/right_arrow.png"
                alt="flèche vers la droite"
              />
            </div>
          </div>
        </Link>

        <Link href="/adminSeances">
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={50}
                width={50}
                src="/images/stars.png"
                alt="deux étoiles"
              />
            </div>
            <a className={style.text}>Séances</a>
            <div className={style.arrow}>
              <Image
                priority
                height={20}
                width={10}
                src="/images/right_arrow.png"
                alt="flèche vers la droite"
              />
            </div>
          </div>
        </Link>

        <Link href="/adminPractitiens">
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={40}
                width={40}
                src="/images/profil.png"
                alt="icones profils d'utilisateurs"
              />
            </div>
            <a className={style.text}>Practitiens</a>
            <div className={style.arrow}>
              <Image
                priority
                height={20}
                width={10}
                src="/images/right_arrow.png"
                alt="flèche vers la droite"
              />
            </div>
          </div>
        </Link>
      </div>
      <Account />
    </Layout>
  );
}
