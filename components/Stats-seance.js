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
import { getSeanceNumber, getSeancesList } from "../model/seances";
import style from "../pages/dashboard/dashboard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsSeances() {
  const [seanceNumber, setSeanceNumber] = useState(0);
  const { user } = useAuth();

  const [monthStats, setMonthStats] = useState([]);

  const month = [
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
  ];
  const year = new Date().getFullYear();

  const getData = async (user) => {
    const number = await getSeanceNumber(user);
    number ? setSeanceNumber(number) : 0;
    const list = await getSeancesList(user);
    const creationList = list?.map((c) => new Date(c.creation_date));
    const seancePerMonth = [];
    for (let i = 0; i < 11; i++) {
      const nb = creationList?.filter(
        (date) => date.getMonth() === i && date.getFullYear() === year
      ).length;
      seancePerMonth.push(nb);
    }
    setMonthStats(seancePerMonth);
  };

  useEffect(() => {
    getData(user);
  }, [user]);

  return (
    <div className={style.content}>
      <h2 className={style.statTitle}>
        Nombre total de séance.s créée.s :{" "}
        <span className={style.number}>{seanceNumber}</span>
      </h2>
      <h2 className={style.statTitle}>Séances créées par mois en {year} : </h2>
      <Bar
        height={300}
        data={{
          labels: month,
          datasets: [
            {
              data: monthStats,
              label: "Séance.s",

              borderRadius: 20,
              backgroundColor: "blue",
              barThickness: 15,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
}
