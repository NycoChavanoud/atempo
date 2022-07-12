import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";
import { getClientList } from "../../model/client.js";
import { useEffect, useState } from "react";

export default function ClientCardList() {
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          className={style.input}
          id="lastname"
          placeholder="Rechercher par nom."
        />
      </div>
      <div className={style.center}>
        <div className={style.list}>
          {clientList
            ? clientList.map((c) => <ClientCard key={c.id} id={c.id} />)
            : null}
        </div>
      </div>
    </>
  );
}
