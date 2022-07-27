/* eslint-disable react/no-unescaped-entities */
import style from "./ClientCardList.module.css";
import ClientCard from "../ClientCard/ClientCard";
import { getClientList } from "../../model/client.js";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../context/authContext";
import { CircularProgress, MobileStepper } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function ClientCardList() {
  const [clientList, setClientList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterList, setFilterList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const { user } = useAuth();

  const handleNextPage = () => {
    if (page < pageNumber - 1) {
      setTimeout(() => setPage(page + 1), 500);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setTimeout(() => setPage(page - 1), 500);
    }
  };

  const getList = async (user) => {
    try {
      setIsLoading(true);
      const list = await getClientList(user);
      setFilterList(list);
      setClientList(list);
      if (list?.length > 0) setPageNumber(Math.ceil(list.length / 6));
      else setPageNumber(1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (isLoading) {
      getList(user);
    }

    if (searchTerm !== "") {
      const newFilterList = clientList.filter((c) => {
        if (c.lastname.toLowerCase().includes(searchTerm.toLowerCase())) {
          return c;
        }
      });
      setFilterList(newFilterList);
      setPage(0);
      setPageNumber(Math.ceil(newFilterList.length / 6));
    } else {
      setFilterList(clientList);
      setPageNumber(Math.ceil(clientList.length / 6));
    }
  }, [user, searchTerm]);

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
            onChange={handleChange}
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
              ? filterList
                  .slice(page * 6, page * 6 + 6)
                  .map((c) => <ClientCard key={c.id} id={c.id} />)
              : null}
          </div>
        </div>
        {filterList?.length > 6 && (
          <MobileStepper
            variant="dots"
            steps={pageNumber}
            position="static"
            activeStep={page}
            sx={{
              width: "80%",
              flexGrow: 1,
              justifyContent: "space-between",
              margin: "auto",
            }}
            className={style.page_stepper}
            nextButton={
              <button
                onClick={handleNextPage}
                disabled={page - 1 > pageNumber}
                className={style.pagination_btn}
              >
                <ArrowCircleRightIcon
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
            }
            backButton={
              <button
                className={style.pagination_btn}
                onClick={handlePreviousPage}
                disabled={page === 0}
              >
                <ArrowCircleLeftIcon
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
            }
          />
        )}
      </>
    );
  }
}
