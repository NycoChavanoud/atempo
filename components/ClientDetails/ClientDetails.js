import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getClientData } from "../../model/client";
import style from "./ClientDetails.module.css";

export default function ClientDetails({ id }) {
  const [clientData, setClientData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getClientData(user, id).then(setClientData);
  }, [id, clientData, user]);
  if (clientData) {
    return (
      <section className={style.box}>
        <h1 className={style.title}>
          {clientData.firstname} {clientData.lastname}
        </h1>
        <h2 className={style.subtitle}>Informations personnelles</h2>
        <p className={style.text}>{clientData.email}</p>
        <p className={style.text}>
          {clientData.streetNumber} {clientData.streetName}
        </p>
        <p className={style.text}>
          {clientData.postalCode} {clientData.city}
        </p>
        <p className={style.text}>{clientData.phoneNumber}</p>
        <h3 className={style.subtitle}>Thématique</h3>
        <p className={style.text}>{clientData.thematic}</p>
        <p>{clientData.other_thematic}</p>
      </section>
    );
  }
}
