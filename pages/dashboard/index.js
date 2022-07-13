import { Avatar } from "@mui/material";
import StatsClients from "../../components/Stats-clients";
import StatsSeances from "../../components/Stats-seance";
import style from "./dashboard.module.css";
import { useEffect, useState } from "react";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";
import Layout from "../../components/Layout/Layout";
import WaveWhiteBurger from "../../components/WaveWhiteBurger/WaveWhiteBurger";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";

export default function Dashboard() {
  const [tabToShow, setTabToShow] = useState("clients");

  const [practitionersData, setPractitionersData] = useState();

  useEffect(() => {
    getAllPractitionersData().then(setPractitionersData);
    console.log(practitionersData);
  }, []);

  return (
    <Layout pageTitle="Tableau de bord">
      <div className={style.boxes}>
        <div>
          <DesktopMenu />
        </div>
        <div>
          <WaveWhiteBurger />

          <div className={style.user}>
            <Avatar className={style.avatar} />
            <h2 className={style.name}>Hello {practitionersData?.firstname}</h2>
          </div>

          <div className={style.container}>
            <div className={style.tabs}>
              <div
                className={style.button}
                onClick={() => setTabToShow("clients")}
                style={{ opacity: tabToShow === "clients" ? "1" : "0.60" }}
                data-cy="clients"
              >
                Clients
              </div>
              <div
                className={style.button}
                onClick={() => setTabToShow("sessions")}
                style={{ opacity: tabToShow === "sessions" ? "1" : "0.60" }}
                data-cy="sessions"
              >
                Séances
              </div>
            </div>

            <div className={style.sections}>
              {tabToShow === "clients" && <StatsClients />}
              {tabToShow === "sessions" && <StatsSeances />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
