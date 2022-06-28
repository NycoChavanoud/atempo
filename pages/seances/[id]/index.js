import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Link from "next/link";
import styles from "../../../styles/Seances.module.css";
import SeanceDetails from "../../../components/SeanceDetails/SeanceDetails";
import AssociatedClients from "../../../components/AssociatedClients/AssociatedClients";
import { useRouter } from "next/router";
import WaveWhiteBurger from "../../../components/WaveWhiteBurger/WaveWhiteBurger";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSeance,
  deleteSeanceMedia,
  getSeanceData,
  getSeanceMediaUrl,
} from "../../../model/seances";
import { Modal } from "@mui/material";

export default function Seance() {
  const [open, setOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [seanceData, setSeanceData] = useState({});
  const [urlSource, setUrlSource] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const warn = (m) =>
    toast.warn(m, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const success = () =>
    toast.success("La séance a été supprimé", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleDelete = (e) => {
    e.preventDefault();

    if (deleteInput === "supprimer") {
      deleteSeanceMedia(seanceData.media_url);
      deleteSeance(id);
      success();
      router.push("/seances");
    } else
      warn(
        "Attention, vous n'avez pas rempli correctement le champs de suppression"
      );
  };

  useEffect(() => {
    if (loadingData)
      getSeanceData(id).then(setSeanceData).then(setLoadingData(false));
    else getSeanceMediaUrl(seanceData.media_url).then(setUrlSource);
  }, [id, loadingData, seanceData.media_url]);

  return (
    <Layout pageTitle={"Séance"}>
      <WaveWhiteBurger />
      <div className="flex flex-col pl-10 pr-10 pb-5 justify-between h-[80vh]">
        <div>
          <h1 className={`${styles.title} mb-8`}>Séance</h1>
          <SeanceDetails seanceData={seanceData} />
          <audio src={urlSource} controls />

          <AssociatedClients />
        </div>

        <div className="flex flex-row lexitem-center justify-center">
          <Link href={`/seances/${id}/edit`}>
            <button className={styles.btn}>Modifier</button>
          </Link>
          <button className={styles.btn} onClick={handleOpen}>
            Supprimer
          </button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "250px",
            backgroundColor: "white",
            boxShadow: 50,
            borderRadius: "20px",
            textAlign: "justify",
            padding: 25,
          }}
        >
          <form
            onSubmit={handleDelete}
            className="flex flex-col justify-around items-center h-[100%]"
          >
            <p>
              Afin de confirmer la suppression, veuillez rentrer
              &quot;supprimer&quot; dans le champs suivant :
            </p>
            <input
              value={deleteInput}
              onChange={(e) => {
                setDeleteInput(e.target.value);
              }}
              placeholder="tapez ici"
              required
              style={{
                border: "black solid 0.1rem",
                textAlign: "center",
                borderRadius: "10px",
              }}
            />
            <div className="flex flex-row justify-between ">
              <button
                className={styles.btn}
                type="Submit"
                style={{ backgroundColor: "red" }}
              >
                Confirmer
              </button>
              <button className={styles.btn} onClick={handleClose}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Layout>
  );
}
