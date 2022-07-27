import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useAuth } from "../context/authContext";
import { getClientNumber } from "../model/client";
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
  const [clientNumber, setClientNumber] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    getClientNumber(user).then((nb) => (nb ? setClientNumber(nb) : 0));
  }, [user]);

  return (
    <div className={style.content}>
      <p>Nombre de patient.es : {clientNumber}</p>

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
