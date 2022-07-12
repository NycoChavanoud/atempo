import style from "./adminClients.module.css";
import Layout from "../../components/Layout/Layout";
import DesktopMenuAdmin from "../../components/DesktopMenuAdmin/DesktopMenuAdmin";
import WaveAdminMenu from "../../components/WaveAdminMenu/WaveAdminMenu";

export default function index() {
  return (
    <Layout pageTitle="Tableau de bord admin">
      <div className={style.boxes}>
        <div className={style.desktopMenu}>
          <DesktopMenuAdmin />
        </div>
        <div className={style.waveAdmin}>
          <WaveAdminMenu />

          <div className={style.customers}>
            <div className={style.title}>
              <h2>Clients</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
