import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./modif-profile.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllPractitionersData,
  updatePractitionersData,
} from "../../model/PractitionersData/practitionersData";
import { BsPencil } from "react-icons/bs";
import Avatar from "../../components/Avatar/Avatar";
import { useAuth } from "../../context/authContext";
import { CircularProgress } from "@mui/material";

export default function Profile() {
  const { user, upload } = useAuth();
  const fileImputRef = useRef();
  const router = useRouter();

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const [practitionersData, setPractitionersData] = useState("");

  const handleAvatarClick = () => {
    fileImputRef.current.click();
  };

  const handleAvatarSelection = async (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    getAllPractitionersData(user)
      .then(setPractitionersData)
      .then(setLoading(false));
  }, [user, photoURL, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmit(true);
      if (avatar) await upload(avatar, user, setLoading);
      await updatePractitionersData(user, { ...practitionersData });
      router.push("/profile");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmit(false);
    }
  };

  const notify = () => toast("Données sauvegardées !");

  return (
    <Layout pageTitle="Modifier votre profil">
      <div className={styles.purple}>
        <button className={styles.btnBack}>
          <Link href="/profile">
            <img
              className={styles.imgBack}
              src="/images/arrow2.png"
              alt="bouton annuler"
            />
          </Link>
        </button>
        <h1 className={styles.title}>Modifier votre profil</h1>

        {submit ? null : (
          <div className={styles.userAvatar}>
            <div className={styles.avatarContainer}>
              <div className={styles.aroundAvatar} onClick={handleAvatarClick}>
                <Avatar
                  className={styles.avatar}
                  loading={loading}
                  src={photoURL || user.photoURL}
                />
              </div>

              <input
                id="avatar"
                accept="image/png, image/jpeg, image/jpg"
                type="file"
                ref={fileImputRef}
                onChange={handleAvatarSelection}
                style={{ display: "none" }}
              />
            </div>

            <BsPencil className={styles.pencil} />
          </div>
        )}

        {submit ? (
          <div className={styles.loader}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="firstName">
              <input
                data-cy="firstName"
                className={styles.input}
                type="text"
                id="firstName"
                placeholder="Prénom"
                required
                value={practitionersData?.firstname}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    firstname: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.label} htmlFor="lastName">
              <input
                data-cy="lastName"
                className={styles.input}
                type="text"
                id="lastName"
                placeholder="Nom"
                required
                value={practitionersData?.lastname}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    lastname: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.label} htmlFor="phone">
              <input
                data-cy="phone"
                className={styles.input}
                type="tel"
                id="phone"
                name="phone"
                placeholder="Téléphone"
                required
                pattern="(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}"
                value={practitionersData?.phone}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    phone: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.label} htmlFor="address">
              <input
                data-cy="address"
                className={styles.input}
                type="text"
                id="address"
                placeholder="Adresse"
                required
                value={practitionersData?.address}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    address: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.label} htmlFor="website_url">
              <input
                data-cy="website_url"
                className={styles.input}
                type="text"
                id="website_url"
                placeholder="Site web"
                value={practitionersData?.website_url}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    website_url: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.label} htmlFor="fb_url">
              <input
                data-cy="fb_url"
                className={styles.input}
                type="text"
                id="fb_url"
                placeholder="Facebook"
                value={practitionersData?.fb_url}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    fb_url: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.label} htmlFor="insta_url">
              <input
                data-cy="insta_url"
                className={styles.input}
                type="text"
                id="insta_url"
                placeholder="Instagram"
                value={practitionersData?.insta_url}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    insta_url: e.target.value,
                  })
                }
              />
            </label>

            <div className={styles.buttonContainer}>
              <button
                className={styles.btn}
                type="submit"
                id="submitBtn"
                disabled={loading}
                onChange={notify}
                data-cy="submitBtn"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
