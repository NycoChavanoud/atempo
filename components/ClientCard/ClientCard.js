import style from "./ClientCard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getClientData, getThematic } from "../../model/client";

export default function ClientCard({ id, circle = false }) {
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
        <a
          className={circle ? style.circle_card : style.card}
          style={{ backgroundColor: thematic.color }}
        >
          {circle ? (
            <h2 className={style.initials}>
              {`${clientData.firstname[0]} ${clientData.lastname[0]}`}
            </h2>
          ) : (
            <h2 className={style.title}>
              {clientData.firstname}
              <br />
              {clientData.lastname}
            </h2>
          )}
        </a>
      </Link>
    );
  }
}
