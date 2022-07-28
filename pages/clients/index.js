import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";
import Link from "next/link";
import ClientCardList from "../../components/ClientCardList/ClientCardList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clients() {
  return (
    <Layout pageTitle="Mes Clients">
      <div className={style.boxes}>
        <div className={style.bg}>
          <DesktopMenu />
        </div>
        <div>
          <GreyBurger />
          <div className={style.purple}>
            <div className={style.box}>
              <h1 className={style.title}>Mes Patients</h1>
            </div>
            <ClientCardList />
            <div className={style.container}>
              <Link href="/clients/creationClient">
                <button className={style.btn}>Ajouter une fiche patient</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
