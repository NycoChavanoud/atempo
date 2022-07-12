import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./modif-profile.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { update, ref } from "firebase/database";
import { db, auth } from "../../config/firebaseConfig";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";

export default function Profile() {
  const [practitionersData, setPractitionersData] = useState();
  const [error, setError] = useState("");

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      await update(ref(db, `practitioners/${user.uid}`), practitionersData);

      router.push("/profile");
    } catch (error) {
      setError("erreur");
    }
  };

  useEffect(() => {
    getAllPractitionersData().then(setPractitionersData);
    console.log(practitionersData);
  }, []);

  const notify = () => toast("C'est sauvegardé !");

  return (
    <Layout pageTitle="Modifier votre profil">
      <div className={styles.purple}>
        <button className={styles.btnBack}>
          <Link href="/profile">
            <img
              className={styles.imgBack}
              src="/img/retour.png"
              alt="bouton annuler"
            />
          </Link>
        </button>
        <h1 className={styles.title}>Modifier votre profil</h1>
        <div className={styles.circleIcon}>
          <AddCircleIcon
            sx={{
              color: "#DADADA",
              width: "70px",
              height: "70px",
              margin: "6px",
              borderRadius: "100px",
              cursor: "pointer",
            }}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="firstName"></label>
            <input
              data-cy="firstName"
              className={styles.input}
              type="text"
              id="firstName"
              placeholder="Prénom"
              value={practitionersData?.firstname}
              onChange={(e) =>
                setPractitionersData({
                  ...practitionersData,
                  firstname: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="lastName"></label>
            <input
              data-cy="lastName"
              className={styles.input}
              type="text"
              id="lastName"
              placeholder="Nom"
              value={practitionersData?.lastname}
              onChange={(e) =>
                setPractitionersData({
                  ...practitionersData,
                  lastname: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone"></label>
            <input
              data-cy="phone"
              className={styles.input}
              type="tel"
              id="phone"
              name="phone"
              minLength="10"
              maxLength="20"
              placeholder="Téléphone"
              value={practitionersData?.phone}
              onChange={(e) =>
                setPractitionersData({
                  ...practitionersData,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="address"></label>
            <input
              data-cy="address"
              className={styles.input}
              type="text"
              id="address"
              placeholder="Adresse"
              value={practitionersData?.address}
              onChange={(e) =>
                setPractitionersData({
                  ...practitionersData,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="website_url"></label>
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
          </div>

          <div className={styles.network}>
            <div className={styles.networkLink}>
              <Image
                width={35}
                height={35}
                src="/img/fb.png"
                alt="logo facebook"
              />
              <input
                data-cy="fb_url"
                className={styles.inputNetwork}
                type="text"
                id="fb_url"
                placeholder="URL"
                value={practitionersData?.fb_url}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    fb_url: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.networkLink}>
              <Image
                width={35}
                height={35}
                src="/img/insta.png"
                alt="logo instagram"
              />

              <input
                data-cy="insta_url"
                className={styles.inputNetwork}
                type="text"
                id="insta_url"
                placeholder="URL"
                value={practitionersData?.insta_url}
                onChange={(e) =>
                  setPractitionersData({
                    ...practitionersData,
                    insta_url: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {error && <p>{error}</p>}

          <div className={styles.buttonContainer}>
            <button
              className={styles.btn}
              type="submit"
              id="submitBtn"
              onClick={notify}
              data-cy="submitBtn"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
