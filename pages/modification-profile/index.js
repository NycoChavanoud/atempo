import React from "react";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import styles from "./modif-profile.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function ModificationProfile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="prénom"></label>
            <input
              className={styles.input}
              type="text"
              id="prénom"
              placeholder="Prénom"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="nom"></label>
            <input
              className={styles.input}
              type="text"
              id="nom"
              placeholder="Nom"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email"></label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="E-mail"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="téléphone"></label>
            <input
              className={styles.input}
              type="tel"
              id="téléphone"
              name="téléphone"
              minLength="10"
              maxLength="20"
              placeholder="Téléphone"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="adresse"></label>
            <input
              className={styles.input}
              type="text"
              id="adresse"
              placeholder="Adresse"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="website"></label>
            <input
              className={styles.input}
              type="text"
              id="website"
              placeholder="Site Internet"
            />
          </div>

          <div className={styles.networks}>
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
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <input
                  className={styles.input}
                  type="text"
                  id="link"
                  placeholder="Lien facebook"
                />
              </Box>
            </Modal>

            <Button className={styles.btnNet} onClick={handleOpen}>
              <Image
                width={40}
                height={40}
                src="/img/twitter.png"
                alt="logo twitter"
              />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <input
                  className={styles.input}
                  type="text"
                  id="link"
                  placeholder="Lien Twitter"
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
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <input
                  className={styles.input}
                  type="text"
                  id="link"
                  placeholder="Lien Instagram"
                />
              </Box>
            </Modal>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.btn} type="submit">
              Annuler
            </button>

            <button className={styles.btn} type="submit">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
