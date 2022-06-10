import { Avatar } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import Image from "next/image";
import Link from "next/link";
import style from "./profile.module.css";

export default function Profile() {
  return (
    <Layout pageTitle="Profile">
      <GreyBurger />
      <h1 className={style.title}>Votre profil</h1>

      <div className={style.user}>
        <Avatar className={style.avatar} />
        <h3 className={style.name}>Prénom Nom</h3>
      </div>

      <h2 className={style.title2}>informations personnelles</h2>

      <section className={style.form}>
        <div className={style.infos}>
          <p className={style.contacts}>Prénom.nom@gmail.com</p>
          <p className={style.contacts}>06 76 06 76 06</p>
          <p className={style.contacts}>praticienatempo.com</p>
        </div>
      </section>

      <div className={style.reseaux}>
        <Link href="https://fr-fr.facebook.com/">
          <a className={style.link}>
            <Image
              width={43}
              height={43}
              src="/img/fb.png"
              alt="logo facebook"
            />
            <p className={style.lnk}>@Sophrologue</p>
          </a>
        </Link>

        <Link href="https://www.instagram.com/?hl=fr">
          <a className={style.link}>
            <Image
              width={43}
              height={43}
              src="/img/insta.png"
              alt="logo instagram"
            />
            <p className={style.lnk}>@Sophrologue</p>
          </a>
        </Link>
      </div>

      <div className={style.btn}>
        <button className={style.button}>Modifier le profil </button>
      </div>
    </Layout>
  );
}
