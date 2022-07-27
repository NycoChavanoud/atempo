/* eslint-disable react/no-unescaped-entities */
import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";
import { getClientList } from "../../model/client.js";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../context/authContext";
import { CircularProgress } from "@mui/material";

export default function ClientCardList() {
  const [clientList, setClientList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const getList = async (user) => {
    try {
      setIsLoading(true);
      const list = await getClientList(user);
      setClientList(list);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList(user);
  }, [user]);

  if (isLoading) {
    return (
      <div className={style.loader}>
        <h2>Chargement...</h2>
        <CircularProgress color="inherit" />
      </div>
    );
  } else {
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
            placeholder="Rechercher par nom"
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
                      c.lastname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
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
}
