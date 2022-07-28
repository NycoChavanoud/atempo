import Avatar from "../../components/Avatar/Avatar";
import StatsClients from "../../components/Stats-clients";
import StatsSeances from "../../components/Stats-seance";
import style from "./dashboard.module.css";
import { useEffect, useState } from "react";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";
import Layout from "../../components/Layout/Layout";
import WaveWhiteBurger from "../../components/WaveWhiteBurger/WaveWhiteBurger";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";
import { useAuth } from "../../context/authContext";

export default function Dashboard() {
  const [tabToShow, setTabToShow] = useState("clients");
  const [pratitionerData, setPratitionerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getAllPractitionersData(user)
      .then(setPratitionerData)
      .then(setIsLoading(false));
  }, [user, isLoading]);

  return (
    <Layout pageTitle="Tableau de bord">
      <div className={style.boxes}>
        <div>
          <DesktopMenu />
        </div>
        <div>
          <WaveWhiteBurger />

          <div className={style.user}>
            <Avatar className={style.avatar} src={user.photoURL} />
            {!isLoading && (
              <h2
                className={style.name}
              >{`${pratitionerData?.firstname} ${pratitionerData?.lastname}`}</h2>
            )}
          </div>

          <div className={style.container}>
            <div className={style.tabs}>
              <div
                className={style.button}
                onClick={() => setTabToShow("clients")}
                style={{ opacity: tabToShow === "clients" ? "1" : "0.60" }}
                data-cy="clients"
              >
                Patients
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
