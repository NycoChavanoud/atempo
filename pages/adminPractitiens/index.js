import style from "./adminPractitiens.module.css";
import Layout from "../../components/Layout/Layout";
import DesktopMenuAdmin from "../../components/DesktopMenuAdmin/DesktopMenuAdmin";
import WaveAdminMenu from "../../components/WaveAdminMenu/WaveAdminMenu";
import { useState, useEffect } from "react";
import { getAllPractitionersDataAdmin } from "../../model/adminData";

export default function AdminPractitiens() {
  const [practitionersData, setPractitionersData] = useState("");

  useEffect(() => {
    getAllPractitionersDataAdmin().then(setPractitionersData);
  }, []);

  return (
    <Layout pageTitle="Tableau de bord admin">
      <div className={style.boxes}>
        <div className={style.desktopMenu}>
          <DesktopMenuAdmin />
        </div>
        <div className={style.waveAdmin}>
          <WaveAdminMenu />

          <div className={style.practitioners}>
            <div className={style.title}>
              <h2>Practitiens</h2>
            </div>
            <div className={style.nombrePractitiens}>
              <h3>Nombre de Practitiens : {practitionersData.practitioners}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
