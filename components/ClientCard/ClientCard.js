import style from "./ClientCard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getClientData } from "../../model/client";

const colors = [
  "var(--main-bg-color)",
  "var(--color1)",
  "var(--color2)",
  "var(--color3)",
  "var(--color4)",
  "var(--color5)",
];
const randomColors = colors[Math.floor(Math.random() * colors.length)];

export default function ClientCard({ id }) {
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getClientData(id).then((data) => setClientData(data));
  }, [id, clientData]);

  if (clientData) {
    return (
      <Link href={`/clients/${id}`}>
        <a
          className={style.card}
          style={{
            backgroundColor: randomColors,
          }}
        >
          <h2 className={style.title}>
            {clientData.firstname}
            <br />
            {clientData.lastname}
          </h2>
        </a>
      </Link>
    );
  }
}
