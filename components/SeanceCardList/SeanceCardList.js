import { MobileStepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSeanceNumber, getSeancesList } from "../../model/seances";
import SeanceCard from "../SeanceCard/SeanceCard";
import styles from "./SeanceCardList.module.css";

export default function SeanceCardList() {
  const [seanceList, setSeanceList] = useState([]);
  const [page, setPage] = useState(1);
  const [left, setLeft] = useState(0);
  const [originalOffset, setOriginalOffset] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [beingTouched, setBeingTouched] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastDate, setLastDate] = useState(Date.now());
  const [PreviousLastDate, setPreviousLastDate] = useState(Date.now());

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
    if (page < pageNumber) {
      setPreviousLastDate(lastDate);
      setLastDate(seanceList[seanceList.length - 1].creation_date);
      setTimeout(() => setPage(page + 1), 500);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setLastDate(PreviousLastDate);
      setTimeout(() => setPage(page - 1), 500);
      setPreviousLastDate(seanceList[0].creation_date);
    }
  };

  const handleMove = (clientX) => {
    if (beingTouched) {
      const touchX = clientX;
      let deltaX = touchX - touchStartX + originalOffset;
      if (deltaX < -200) {
        handleNextPage();
        deltaX = 0;
      } else if (deltaX > 200) {
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

  getSeanceNumber().then((nb) => setPageNumber(Math.ceil(nb / 6)));

  useEffect(() => {
    getSeancesList(page, lastDate).then(setSeanceList);
    console.log("lastitem", lastDate);
  }, [page]);

  return (
    <div className={styles.container}>
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
        {seanceList
          ? seanceList.map((s) => (
              <SeanceCard key={s.id} id={s.id}></SeanceCard>
            ))
          : null}
      </div>
      <MobileStepper
        variant="dots"
        steps={pageNumber}
        position="static"
        activeStep={page - 1}
        sx={{ maxWidth: 400, flexGrow: 1 }}
      />
    </div>
  );
}
