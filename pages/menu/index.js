import style from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";

export default function MobileMenu() {
  return (
    <Layout menu>
      <div classe={style.container}>
        <img className={style.user} src="/images/add1.png" alt="add a user" />
        <div className={style.links}>
          <button className={style.button}>Créer une séance</button>
          <Link data-cy="dashboardBtn" href="/dashboard">
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
                  alt="hearts"
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
                  alt="stars"
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
                  alt="user's profiles"
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
        </div>
      </div>
    </Layout>
  );
}
