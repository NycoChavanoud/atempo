import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useAuth } from "../context/authContext";
import { getSeanceNumber } from "../model/seances";
import style from "../pages/dashboard/dashboard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsSeances() {
  const [seanceNumber, setSeanceNumber] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    getSeanceNumber(user).then(setSeanceNumber);
  }, [user]);

  return (
    <div className={style.content}>
      <p>Nombre de séance.s créée.s : {seanceNumber}</p>
      <Line
        className={style.line}
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Yoga",
              data: [
                "400",
                "200",
                "300",
                "500",
                "100",
                "700",
                "900",
                "0",
                "2000",
                "300",
                "700",
                "400",
              ],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
}
