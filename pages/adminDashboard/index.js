import style from "./adminDashboard.module.css";
import Layout from "../../components/Layout/Layout";
import WaveAdminMenu from "../../components/WaveAdminMenu/WaveAdminMenu";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DesktopMenuAdmin from "../../components/DesktopMenuAdmin/DesktopMenuAdmin";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  return (
    <Layout pageTitle="Tableau de bord admin">
      <div className={style.mainContainer}>
        <div className={style.desktopMenu}>
          <DesktopMenuAdmin />
        </div>
        <div className={style.waveAdmin}>
          <WaveAdminMenu />
        </div>

        <div className={style.mainTitle}>
          <h2 className={style.title}>Données globales</h2>
        </div>

        <div className={style.donut}>
          <Doughnut
            data={{
              labels: ["Practitiens", "Séances", "Clients"],
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 23],
                  backgroundColor: [
                    "rgba(245, 11, 37, 0.8)",
                    "rgba(38, 40, 248, 0.8)",
                    "rgba(57, 184, 53, 0.8)",
                  ],
                  borderColor: [
                    "rgba(179, 3, 34, 0.8)",
                    "rgba(19, 5, 155, 0.8)",
                    "rgba(10, 155, 5, 0.8)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
