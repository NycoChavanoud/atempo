import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout/Layout";
import SeanceCardList from "../../components/SeanceCardList/SeanceCardList";
import styles from "../../styles/Seances.module.css";
import WaveWhiteBurger from "../../components/WaveWhiteBurger/WaveWhiteBurger";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MySeances() {
  return (
    <Layout pageTitle={"Mes séances"}>
      <WaveWhiteBurger />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center justify-around">
          <Avatar sx={{ width: 80, height: 80, margin: "10px" }} />
          <h1 className={styles.title}>Mes séances</h1>
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
