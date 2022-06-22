import style from "./ClientCard.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getClientData } from "../../model/client";

export default function ClientCard({ id }) {
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getClientData(id).then((data) => setClientData(data));
  }, [id, clientData]);

  if (clientData) {
    return (
      <Link href={`/clients/${id}`}>
        <a className={style.card}>
          <h2 className={style.title}>{clientData.firstname}</h2>
          <h3 className={style.title}>{clientData.lastname}</h3>
        </a>
      </Link>
    );
  }
}
