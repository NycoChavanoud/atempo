import style from "./clientDetails.module.css";
import Layout from "../../../components/Layout/Layout";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import DesktopMenu from "../../../components/DesktopMenu/DesktopMenu";
import GreyBurger from "../../../components/GreyBurger/GreyBurger";
import { useRouter } from "next/router";
import { getClientData, deleteClient } from "../../../model/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SeanceCard from "../../../components/SeanceCard/SeanceCard";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/authContext";

export default function Client() {
  const [open, setOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [clientData, setClientData] = useState({});
  const { user } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getClientData(user, id).then(setClientData);
  }, [user, id]);

  const warn = (m) => {
    toast.warn(m, {
      position: "bottom-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const success = () => {
    toast.success("Client supprimé.", {
      position: "bottom-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (deleteInput === "SUPPRIMER") {
      deleteClient(user, id);
      success();
      router.push("/clients");
    } else {
      warn("Veuillez entrer 'SUPRRIMER' ");
    }
  };

  if (clientData) {
    return (
      <Layout pageTitle={"Client"}>
        <div className={style.boxes}>
          <div className={style.bg}>
            <DesktopMenu />
          </div>
          <div>
            <div className={style.container}>
              <GreyBurger />
              <Link href="/clients">
                <button className={style.backBtn}>Mes Patients</button>
              </Link>
            </div>
            <ClientDetails id={id} />
            <p className={style.text}>{clientData.motif}</p>
            <div className="flex flex-col justify-center items-center">
              <h2 className={style.title}>Séance.s associée.s : </h2>
              <div className="flex flex-row overflow-x-auto">
                {clientData.seanceList?.map((seanceID) => (
                  <SeanceCard key={seanceID} id={seanceID} circle={true} />
                ))}
              </div>
              {!clientData.seanceList && (
                <p className={style.noSeance}>Pas de séance associée</p>
              )}
            </div>

            <div className={style.box}>
              <Link href={`/clients/${id}/edit`}>
                <button className={style.btn}>Modifier la fiche</button>
              </Link>
              <button onClick={handleOpen} className={style.btn}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={handleClose}>
          <form onSubmit={handleDelete} className={style.modal}>
            <p>
              Afin de confirmer la suppression <br /> veuillez rentrer{" "}
              <span className={style.span}>SUPPRIMER</span> dans le champ
              suivant:
            </p>
            <input
              placeholder="tapez ici"
              required
              value={deleteInput}
              onChange={(e) => {
                setDeleteInput(e.target.value);
              }}
              className={style.modalInput}
            />
            <div className={style.modalBtn}>
              <button
                type="submit"
                className={style.btn}
                style={{ backgroundColor: "red" }}
              >
                Confirmer
              </button>
              <button className={style.btn} onClick={handleClose}>
                Annuler
              </button>
            </div>
          </form>
        </Modal>
      </Layout>
    );
  }
}
