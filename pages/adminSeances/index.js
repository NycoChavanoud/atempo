import style from "./adminSeances.module.css";
import Layout from "../../components/Layout/Layout";
import DesktopMenuAdmin from "../../components/DesktopMenuAdmin/DesktopMenuAdmin";
import WaveAdminMenu from "../../components/WaveAdminMenu/WaveAdminMenu";

export default function index() {
  return (
    <Layout pageTitle="Tableau de bord admin">
      <div className={style.mainContainer}>
        <div className={style.desktopMenu}>
          <DesktopMenuAdmin />
        </div>
        <div className={style.waveAdmin}>
          <WaveAdminMenu />
        </div>
        <div className={style.seances}>
          <div className={style.title}>
            <h2>Séances</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}
