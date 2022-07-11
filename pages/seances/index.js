import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout/Layout";
import SeanceCardList from "../../components/SeanceCardList/SeanceCardList";
import styles from "../../styles/Seances.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";

export default function MySeances() {
  return (
    <Layout pageTitle={"Mes séances"}>
      <div className={styles.boxes}>
        <div>
          <DesktopMenu />
        </div>

        <SeanceCardList />
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
        <Link href="/seances/create">
          <button className={styles.btn}>Ajouter une séance</button>
        </Link>
      </div>
    </Layout>
  );
}
