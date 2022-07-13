/* eslint-disable react/no-unescaped-entities */
import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";
import { getClientList } from "../../model/client.js";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function ClientCardList() {
  const [clientList, setClientList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          className={style.input}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          id="lastname"
          placeholder="Rechercher par nom."
        />
        <SearchIcon />
      </div>
      {!clientList && (
        <p
          style={{
            textAlign: "center",
            color: "var(--main-bg-color)",
            padding: "20px",
          }}
        >
          Il semblerait que vous n'ayez pas encore enregistré de client.
        </p>
      )}
      <div className={style.center}>
        <div className={style.list}>
          {clientList
            ? clientList
                .filter((c) => {
                  if (searchTerm === "") {
                    return c;
                  } else if (
                    c.lastname.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return c;
                  }
                })
                .map((c) => <ClientCard key={c.id} id={c.id} />)
            : null}
        </div>
      </div>
    </>
  );
}
