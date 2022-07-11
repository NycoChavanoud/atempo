/* eslint-disable react/no-unescaped-entities */
import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";
import { getClientList } from "../../model/client";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

export default function ClientCardList() {
  const [clientList, setClientList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          className={style.input}
          id="lastname"
          value={wordEntered}
          placeholder="Rechercher par nom ou prénom."
        />

        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {clientList && clientList.length !== 0 && (
        <div className={style.center}>
          <div className={style.list}>
            {clientList.map((c) => (
              <ClientCard key={c.id} id={c.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
