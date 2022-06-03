import style from "./dashboard.module.css";
import Layout from "../../components/Layout/Layout";

export default function Dashboard() {
  return (
    <Layout page pageTitle="Profil">
      <h1 className={style.title}>Dashboard</h1>
    </Layout>
  );
}