import { useEffect, useState } from "react";
import { getClientData } from "../../model/clients";
import style from "./ClientDetails.module.css";

export default function ClientDetails({ id }) {
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    getClientData(id).then((data) => setClientData(data));
  }, [id, clientData]);
  if (clientData) {
    return <h2 className={style.title}>{clientData.firstname}</h2>;
  }
}
