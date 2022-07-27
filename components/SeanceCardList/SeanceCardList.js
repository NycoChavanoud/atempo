import { CircularProgress, MobileStepper } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, { useEffect, useState } from "react";
import { getSeancesList } from "../../model/seances";
import SeanceCard from "../SeanceCard/SeanceCard";
import styles from "./SeanceCardList.module.css";
import { useAuth } from "../../context/authContext";
import SearchIcon from "@mui/icons-material/Search";

export default function SeanceCardList() {
  const [seanceList, setSeanceList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);
  const [left, setLeft] = useState(0);
  const [originalOffset, setOriginalOffset] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [beingTouched, setBeingTouched] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { user } = useAuth();

  const handleStart = (clientX) => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
    }

    setOriginalOffset(left);
    setTouchStartX(clientX);
    setBeingTouched(true);
    setIntervalId(null);
  };

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

  const handleMove = (clientX) => {
    if (beingTouched) {
      const touchX = clientX;
      let deltaX = touchX - touchStartX + originalOffset;
      if (deltaX < -100) {
        handleNextPage();
        deltaX = 0;
      } else if (deltaX > 100) {
        handlePreviousPage();
        deltaX = 0;
      } else deltaX = 0;

      setLeft(deltaX);
    }
  };

  const handleEnd = () => {
    setTouchStartX(0);
    setBeingTouched(false);
  };

  const handleTouchStart = (e) => {
    handleStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleMouseUp();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const getList = async (user) => {
    try {
      setIsLoading(true);
      const list = await getSeancesList(user);
      setFilterList(list);
      setSeanceList(list);
      if (list?.length > 0) setPageNumber(Math.ceil(list.length / 6));
      else setPageNumber(1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getList(user);
    }

    if (searchTerm !== "") {
      const newFilterList = seanceList.filter((c) => {
        if (c.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return c;
        }
      });
      setFilterList(newFilterList);
      setPage(0);
      setPageNumber(Math.ceil(newFilterList.length / 6));
    } else {
      setFilterList(seanceList);
      setPageNumber(Math.ceil(seanceList.length / 6));
    }
  }, [user, searchTerm]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <h2>Chargement...</h2>
        <CircularProgress color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <form className={styles.search}>
          <input
            type="text"
            className={styles.input}
            value={searchTerm}
            onChange={handleChange}
            id="lastname"
            placeholder="Rechercher par titre"
          />
          <SearchIcon />
        </form>
        <div
          className={styles.list}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={() => handleTouchEnd()}
          // The following event handlers are for mouse compatibility:
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={() => handleMouseUp()}
          onMouseLeave={() => handleMouseLeave()}
        >
          {seanceList ? (
            filterList
              .slice(page * 6, page * 6 + 6)
              .map((s) => <SeanceCard key={s.id} id={s.id}></SeanceCard>)
          ) : (
            <p
              className={styles.emptyList}
              style={{
                color: "var(--main-bg-color)",
                padding: "20px",
              }}
            >
              Il semblerait que vous n&apos;ayez pas encore enregistré de
              séances.
            </p>
          )}
        </div>

        {filterList?.length > 6 && (
          <MobileStepper
            variant="dots"
            steps={pageNumber}
            position="static"
            activeStep={page}
            sx={{
              width: "100%",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            className={styles.page_stepper}
            nextButton={
              <button
                onClick={handleNextPage}
                disabled={page - 1 > pageNumber}
                className={styles.pagination_btn}
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
                className={styles.pagination_btn}
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
      </div>
    );
  }
}
