import { useEffect, useState } from "react";
import { getClientData } from "../../model/client";
import style from "./ClientDetails.module.css";

export default function ClientDetails({ id }) {
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    getClientData(id).then(setClientData);
  }, [id, clientData]);
  if (clientData) {
    return (
      <section className={style.box}>
        <h1 className={style.title}>
          {clientData.firstname} {clientData.lastname}
        </h1>
        <h2 className={style.subtitle}>Informations personnelles</h2>
        <p className={style.text}>{clientData.email}</p>
        <p className={style.text}>{clientData.phoneNumber}</p>
        <h3 className={style.subtitle}>Thématique</h3>
        <p className={style.text}>{clientData.thematic}</p>
      </section>
    );
  }
}
