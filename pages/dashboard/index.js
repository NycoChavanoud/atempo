import style from "./dashboard.module.css";
import Layout from "../../components/Layout";

export default function Dashboard() {
  return (
    <Layout purple pageTitle="Profil">
      <div className={style.purpleBackground}>
        <h1 className={style.title}>Dashboard</h1>
      </div>
    </Layout>
  );
}
