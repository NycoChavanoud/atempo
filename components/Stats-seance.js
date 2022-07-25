import { useEffect, useState } from "react";
import { getAllSeances, getMethodList } from "../model/seances";

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
import { Line } from "react-chartjs-2";
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

function strNoAccent(a) {
  var b = "áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
    c = "aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
    d = "";
  for (var i = 0, j = a.length; i < j; i++) {
    var e = a.substr(i, 1);
    d += b.indexOf(e) !== -1 ? c.substr(b.indexOf(e), 1) : e;
  }
  return d;
}

export default function StatsSeances() {
  const [AllSeances, setAllSeances] = useState([]);
  const [AllMethods, setAllMethods] = useState([]);

  useEffect(() => {
    getAllSeances().then(setAllSeances);
    getMethodList().then(setAllMethods);
  }, []);

  const test = [];

  AllMethods.map(function (item) {
    const name = strNoAccent(item.name.toLowerCase());

    var d = 0;

    AllSeances.map(function (item) {
      if (item.method != name) {
        return false;
      }

      d++;
    });

    test[name] = d;
  });

  console.log(test);

  return (
    <div className={style.content}>
      <Line
        height={"300px"}
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
