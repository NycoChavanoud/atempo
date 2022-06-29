import { Avatar } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import Link from "next/link";
import style from "./profile.module.css";
import { useEffect, useState } from "react";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";

export default function Profile() {
  const [practitionersData, setPractitionersData] = useState();

  useEffect(() => {
    getAllPractitionersData().then(setPractitionersData);
    console.log(practitionersData);
  }, []);

  return (
    <Layout pageTitle="Profile">
      <GreyBurger />
      <h1 className={style.title}>Votre profil</h1>

      <div className={style.user}>
        <Avatar className={style.avatar} />
        <div>
          <h3 className={style.name}>{practitionersData?.firstname}</h3>
          <h3 className={style.name}>{practitionersData?.lastname}</h3>
        </div>
      </div>

      <h2 className={style.title2}>informations personnelles</h2>

      <section className={style.form}>
        <div className={style.infos}>
          <p className={style.contacts}>{practitionersData?.email}</p>
          <p className={style.contacts}>{practitionersData?.phone}</p>
          <p className={style.contacts}>{practitionersData?.website_url}</p>
        </div>
      </section>

      <div className={style.reseaux}>
        <a
          target="_blank"
          rel="noreferrer"
          href={practitionersData?.fb_url}
          className={style.link}
        >
          <img className={style.logo} src="/img/fb.png" alt="logo facebook" />
          <p className={style.lnkString}>Facebook</p>
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href={practitionersData?.insta_url}
          className={style.link}
        >
          <img
            className={style.logo}
            src="/img/insta.png"
            alt="logo instagram"
          />
          <p className={style.lnkString}>Instagram</p>
        </a>
      </div>

      <div className={style.btn}>
        <Link href="/profile/editPractitioner">
          <button className={style.button}>Modifier</button>
        </Link>
      </div>
    </Layout>
  );
}
