import style from "./clients.module.css";
import Layout from "../../components/Layout/Layout";
import GreyBurger from "../../components/GreyBurger/GreyBurger";
import Link from "next/link";

export default function Clients() {
  return (
    <Layout pageTitle="Clients">
      <GreyBurger />
      <div className={style.purple}>
        <div className={style.box}>
          <Link href="/clients/creationClient">
            <button className={style.btn}>Ajouter un client</button>
          </Link>
          <h1 className={style.title}>Mes clients</h1>
        </div>
      </div>
    </Layout>
  );
}
