import style from "./ClientCard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getClientData, getThematic } from "../../model/client";
import { useAuth } from "../../context/authContext";

export default function ClientCard({ id, circle = false }) {
  const [clientData, setClientData] = useState({});
  const [thematic, setThematic] = useState({ color: "#C5C5DB" });
  const { user } = useAuth();

  useEffect(() => {
    getClientData(user, id).then((data) => setClientData(data));
    if (clientData) {
      getThematic(clientData.thematic).then((data) => setThematic(data));
    }
  }, [id, clientData, user]);

  if (clientData) {
    return (
      <Link href={`/clients/${id}`}>
        <a
          className={circle ? style.circle_card : style.card}
          style={{ backgroundColor: thematic?.color || "grey" }}
        >
          {circle ? (
            <h2 className={style.initials}>
              {`${clientData.firstname?.substr(
                0,
                1
              )} ${clientData.lastname?.substr(0, 1)}`}
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
