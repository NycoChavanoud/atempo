import style from "./adminClients.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getClientData } from "../../model/client";
import Layout from "../../components/Layout/Layout";
import DesktopMenuAdmin from "../../components/DesktopMenuAdmin/DesktopMenuAdmin";
import WaveAdminMenu from "../../components/WaveAdminMenu/WaveAdminMenu";

export default function AdminClients() {
  const router = useRouter();
  const { id } = router.query;
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    getClientData(id).then(setClientData);
  }, [id, clientData]);

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
