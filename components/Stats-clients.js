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
import { getClientList, getClientNumber } from "../model/client";
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

export default function StatsClients() {
  const [clientNumber, setClientNumber] = useState(0);
  const [monthStats, setMonthStats] = useState([]);
  const { user } = useAuth();

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
    const number = await getClientNumber(user);
    number ? setClientNumber(number) : 0;
    const list = await getClientList(user);
    const creationList = list?.map((c) => new Date(c.creation_date));
    const clientPerMonth = [];
    for (let i = 0; i < 11; i++) {
      const nb = creationList?.filter(
        (date) => date.getMonth() === i && date.getFullYear() === year
      ).length;
      clientPerMonth.push(nb);
    }
    setMonthStats(clientPerMonth);
  };

  useEffect(() => {
    getData(user);
  }, [user]);

  return (
    <div className={style.content}>
      <h2 className={style.statTitle}>
        Nombre total de patient.es :{" "}
        <span className={style.number}>{clientNumber}</span>
      </h2>
      <h2 className={style.statTitle}>
        Nouveaux patients par mois en {year} :{" "}
      </h2>
      <Line
        height={300}
        className={style.line}
        data={{
          labels: month,
          datasets: [
            {
              data: monthStats,
              label: "Patient.es",
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
