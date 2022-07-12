/* eslint-disable react/no-unescaped-entities */
import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";
import { getClientList } from "../../model/client.js";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function ClientCardList() {
  const [clientList, setClientList] = useState([]);
  const [lastnameEntered, setLastnameEntered] = useState("");

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  const handleFilter = (e) => {
    const searchLastname = e.target.value;
    setLastnameEntered(searchLastname);
    const newFilter = clientList.filter((value) => {
      value.lastname.toLowerCase().includes(searchLastname.toLowerCase());
    });
    if (searchLastname === "") {
      setClientList([]);
    } else {
      setClientList(newFilter);
    }
  };
  console.log(setClientList);

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          className={style.input}
          id="lastname"
          value={lastnameEntered}
          onChange={handleFilter}
          placeholder="Rechercher par nom."
        />
        <SearchIcon />
      </div>
      {!clientList && (
        <p style={{ textAlign: "center", color: "var(--main-bg-color)" }}>
          Il semblerait que vous n'ayez pas encore enregistré de client.
        </p>
      )}
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
