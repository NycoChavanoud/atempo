import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import style from "../pages/dashboard/dashboard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsClients() {
  console.log("test 30");
  return (
    <div className={style.content}>
      <Bar
        className={style.bar}
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [
            {
              data: [5, 2, 10, 5, 3, 6, 4, 15],
              borderRadius: 20,
              label: "Sophrologie",
              backgroundColor: "blue",
              barThickness: 15,
            },
          ],
        }}
        options={{ responsive: false }}
      />
    </div>
  );
}
