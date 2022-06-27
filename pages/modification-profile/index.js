import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./modif-profile.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { update, ref } from "firebase/database";
import { db, auth } from "../../config/firebaseConfig";

export default function ModificationProfile() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website_url, setWebsite_url] = useState("");
  const [fb_url, setFb_url] = useState("");
  const [insta_url, setInsta_url] = useState("");
  const [error, setError] = useState("");

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      await update(ref(db, `practitioners/${user.uid}`), {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        address,
        website_url,
        fb_url,
        insta_url,
      });

      router.push("/profile");
    } catch (error) {
      setError("erreur");
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notify = () => toast("C'est sauvegardé !");

  return (
    <Layout pageTitle="Modifier votre profil">
      <div className={styles.purple}>
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email"></label>
            <input
              data-cy="email"
              className={styles.input}
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="website_url"></label>
            <input
              data-cy="website_url"
              className={styles.input}
              type="text"
              id="website_url"
              placeholder="Site Internet"
              value={website_url}
              onChange={(e) => setWebsite_url(e.target.value)}
            />
          </div>

          <div className={styles.network}>
            <Button className={styles.btnNet} onClick={handleOpen}>
              <Image
                width={40}
                height={40}
                src="/img/fb.png"
                alt="logo facebook"
              />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 350,
                  bgcolor: "background.paper",
                  borderRadius: "20px",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <input
                  data-cy="fb_url"
                  className={styles.inputNetwork}
                  type="text"
                  id="fb_url"
                  placeholder="Lien"
                  value={fb_url}
                  onChange={(e) => setFb_url(e.target.value)}
                />
              </Box>
            </Modal>

            <Button className={styles.btnNet} onClick={handleOpen}>
              <Image
                width={40}
                height={40}
                src="/img/insta.png"
                alt="logo instagram"
              />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 350,
                  bgcolor: "background.paper",
                  borderRadius: "20px",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <input
                  data-cy="insta_url"
                  className={styles.inputNetwork}
                  type="text"
                  id="insta_url"
                  placeholder="Lien"
                  value={insta_url}
                  onChange={(e) => setInsta_url(e.target.value)}
                />
              </Box>
            </Modal>
          </div>

          {error && <p>{error}</p>}

          <div className={styles.buttonContainer}>
            <Link href="/profile">
              <button className={styles.btn}>Annuler</button>
            </Link>

            <button
              className={styles.btn}
              type="submit"
              id="submitBtn"
              onClick={notify}
              data-cy="submitBtn"
            >
              Sauvegarder
            </button>
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
        </form>
      </div>
    </Layout>
  );
}
