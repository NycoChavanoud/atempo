import style from "./menu.module.css";
import WhiteCross from "../../components/WhiteCross/WhiteCross";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../../components/Avatar/Avatar";
import Layout from "../../components/Layout/Layout";
import Deconnexion from "../../components/Deconnexion/Deconnexion";
import DisplayCurrentUser from "../../components/DisplayCurrentUser/DisplayCurrentUser";
import { useAuth } from "../../context/authContext";

export default function MobileMenu() {
  const { user } = useAuth();
  const admin = user.admin;

  return (
    <Layout pageTitle="Menu">
      <WhiteCross />
      <div className={style.container}>
        <Avatar />
        <Link href="/seances/createFromMenu">
          <button className={style.button}>Créer une séance</button>
        </Link>
      </div>

      <DisplayCurrentUser />

      <div className={style.links}>
        <Link data-cy="dashboardBtn" href="/dashboard">
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
        <Link href="/clients">
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
        <Link href="/seances">
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
        <Link href="/profile">
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
            <a className={style.text}>Profil</a>
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
        {user.uid === admin ? (
          <Link href="/admin">
            <div className={style.link}>
              <div className={style.icon}>
                <Image
                  priority
                  height={40}
                  width={40}
                  src="/images/ZENEGO-logo.jpg"
                  alt="icone admin Zenego"
                />
              </div>
              <a className={style.text}>Admin</a>
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
        ) : null}
      </div>
      <Deconnexion />
    </Layout>
  );
}
