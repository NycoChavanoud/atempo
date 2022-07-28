import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Link from "next/link";
import styles from "../../../styles/Seances.module.css";
import SeanceDetails from "../../../components/SeanceDetails/SeanceDetails";
import AssociatedClients from "../../../components/AssociatedClients/AssociatedClients";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSeance,
  deleteSeanceMedia,
  getSeanceData,
  getSeanceMediaUrl,
} from "../../../model/seances";
import { CircularProgress, Modal } from "@mui/material";
import ReactPlayer from "react-player";
import DesktopMenu from "../../../components/DesktopMenu/DesktopMenu";
import { useAuth } from "../../../context/authContext";
import GreyBurger from "../../../components/GreyBurger/GreyBurger";

export default function Seance() {
  const [open, setOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [seanceData, setSeanceData] = useState({});
  const [urlSource, setUrlSource] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const { user } = useAuth();

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

    if (deleteInput === "SUPPRIMER") {
      deleteSeanceMedia(seanceData.media_url);
      deleteSeance(user, id);
      success();
      router.push("/seances");
    } else
      warn(
        "Attention, vous n'avez pas rempli correctement le champs de suppression"
      );
  };

  const getData = async (user, id) => {
    const sData = await getSeanceData(user, id);
    setSeanceData(sData);
    if (sData) {
      const url = await getSeanceMediaUrl(sData.media_url);
      setUrlSource(url);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getData(user, id);
  }, [id, loadingData, user]);

  return (
    <Layout pageTitle={"Séance"}>
      <div className={styles.boxes}>
        <div>
          <DesktopMenu />
        </div>
        <div>
          <div className={styles.headerContainer}>
            <GreyBurger />
            <Link href="/seances">
              <button className={styles.backBtn}>Mes séances</button>
            </Link>
          </div>

          <div className="flex flex-col p-10 justify-between h-[80vh] lg:mt-10">
            {loadingData ? (
              <div className="flex justify-center">
                <h2>Chargement...</h2>
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <div>
                <h1 className={`${styles.title} mb-5`}>{seanceData?.title}</h1>
                <SeanceDetails seanceData={seanceData} />
                {loadingData ? (
                  <div className="flex justify-center">
                    <CircularProgress color="inherit" />
                  </div>
                ) : (
                  <ReactPlayer
                    url={urlSource}
                    width="100%"
                    height="20%"
                    controls
                  />
                )}{" "}
                <AssociatedClients
                  clientList={seanceData?.clientList}
                  setLoadingData={setLoadingData}
                />
              </div>
            )}

            <div className="flex flex-row item-center justify-center">
              <Link href={`/seances/${id}/edit`}>
                <button className={styles.btn}>Modifier</button>
              </Link>
              <button className={styles.btn} onClick={handleOpen}>
                Supprimer
              </button>
            </div>
          </div>
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
              <span className={styles.deleteWord}> SUPPRIMER </span> dans le
              champ suivant:
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
