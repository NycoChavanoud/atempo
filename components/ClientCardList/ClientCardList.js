import style from "./ClientCardList.module.css";
import React from "react";
import ClientCard from "../ClientCard/ClientCard";

export default function ClientCardList({ clientList }) {
  return (
    <div className={style.list}>
      {clientList
        ? clientList.map((client) => (
            <ClientCard key={client.id} id={client.id}></ClientCard>
          ))
        : null}
    </div>
  );
}
