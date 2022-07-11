import React from "react";
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
  return (
    <div className={style.content}>
      <Bar
        height={"300px"}
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [
            {
              data: [1, 2, 4, 5, 6, 10, 11],
              borderRadius: 30,
              label: "Yoga",
              backgroundColor: "green",
              barThickness: 10,
            },
            {
              data: [5, 2, 10, 5, 3, 6, 4],
              borderRadius: 20,
              label: "Sophrologie",
              backgroundColor: "blue",
              barThickness: 10,
            },
          ],
        }}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
