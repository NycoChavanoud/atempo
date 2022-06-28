import style from "./ClientCard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getClientData, getThematic } from "../../model/client";

export default function ClientCard({ id }) {
  const [clientData, setClientData] = useState();
  const [thematic, setThematic] = useState({ color: "#C5C5DB" });

  useEffect(() => {
    getClientData(id).then((data) => setClientData(data));
    if (clientData) {
      getThematic(clientData.thematic).then((data) => setThematic(data));
    }
  }, [id, clientData]);

  if (clientData) {
    return (
      <Link href={`/clients/${id}`}>
        <a className={style.card} style={{ backgroundColor: thematic.color }}>
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
