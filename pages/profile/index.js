/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";
import Link from "next/link";
import style from "./profile.module.css";
import { useEffect, useState } from "react";
import {
  getAllPractitionersData,
  updateDataIfGoogleSignIn,
} from "../../model/PractitionersData/practitionersData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../../components/Avatar/Avatar";
import { useAuth } from "../../context/authContext";

export default function Profile() {
  const { user } = useAuth();
  const [practitionersData, setPractitionersData] = useState();
  const [dataLoading, setDataLoading] = useState(true);
  const [googleUpdateLoading, setGoogleUpdateLoading] = useState(true);

  const getData = async (user) => {
    const data = await getAllPractitionersData(user);
    setPractitionersData(data);
    setDataLoading(false);
    if (!data && !dataLoading) {
      updateDataIfGoogleSignIn(user);
      setGoogleUpdateLoading(false);
    }
  };

  useEffect(() => {
    getData(user);
  }, [user, dataLoading, googleUpdateLoading]);

  return (
    <Layout pageTitle="Profile">
      <div className={style.boxes}>
        <div>
          <DesktopMenu />
        </div>
        <div>
          <GreyBurger />
          <h1 className={style.title}>Votre profil</h1>

          <div className={style.user}>
            <Avatar
              className={style.avatar}
              loading={dataLoading}
              src={user.photoURL}
            />
            <div>
              <h3 className={style.name}>{practitionersData?.firstname}</h3>
              <h3 className={style.name}>{practitionersData?.lastname}</h3>
            </div>
          </div>

          <h2 className={style.title2}>informations personnelles</h2>

          <section className={style.form}>
            <div className={style.infos}>
              <p className={style.contacts}>{practitionersData?.address}</p>
              <p className={style.contacts}>{practitionersData?.email}</p>
              <p className={style.contacts}>{practitionersData?.phone}</p>
            </div>
          </section>

          <div className={style.reseaux}>
            {practitionersData?.website_url && (
              <a
                target="_blank"
                rel="noreferrer"
                href={practitionersData?.website_url}
                className={style.link}
              >
                <img
                  src="/images/website.png"
                  className={style.logo}
                  alt="website logo"
                />
                <p className={style.lnkString}>Site web</p>
              </a>
            )}
            {practitionersData?.fb_url && (
              <a
                target="_blank"
                rel="noreferrer"
                href={practitionersData?.fb_url}
                className={style.link}
              >
                <img
                  src="/images/fb.png"
                  className={style.logo}
                  alt="Facebook logo"
                />
                <p className={style.lnkString}>Facebook</p>
              </a>
            )}

            {practitionersData?.insta_url && (
              <a
                target="_blank"
                rel="noreferrer"
                href={practitionersData?.insta_url}
                className={style.link}
              >
                <img
                  src="/images/insta.png"
                  className={style.logo}
                  alt="Instagram logo"
                />
                <p className={style.lnkString}>Instagram</p>
              </a>
            )}
          </div>

          <div className={style.btn}>
            <Link href="/profile/editPractitioner">
              <button className={style.button}>Modifier</button>
            </Link>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </Layout>
  );
}
