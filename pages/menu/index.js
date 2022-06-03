import style from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";

export default function MobileMenu() {
  return (
    <Layout menu>
      <div classe={style.container}>
        <img className={style.user} src="/images/add1.png" alt="add a user" />
        <div className={style.links}>
          <button className={style.button}>Créer une séance</button>
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={40}
                width={45}
                src="/images/dashboard.png"
                alt="dashboard"
              />
            </div>
            <Link href="/dashboard">
              <a className={style.text}>Tableau de bord</a>
            </Link>
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
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={40}
                width={45}
                src="/images/clients.png"
                alt="hearts"
              />
            </div>
            <Link href="/clients">
              <a className={style.text}>Clients</a>
            </Link>
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
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={50}
                width={50}
                src="/images/stars.png"
                alt="stars"
              />
            </div>
            <Link href="/sessions">
              <a className={style.text}>Séances</a>
            </Link>
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
          <div className={style.link}>
            <div className={style.icon}>
              <Image
                priority
                height={40}
                width={40}
                src="/images/profil.png"
                alt="user's profiles"
              />
            </div>
            <Link href="/profile">
              <a className={style.text}>Profil</a>
            </Link>
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
        </div>
      </div>
    </Layout>
  );
}
