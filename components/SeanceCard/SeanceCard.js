import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getMethod, getThematic, getSeanceData } from "../../model/seances";
import Duration from "./Duration";
import styles from "./SeanceCard.module.css";

export default function SeanceCard({ id, circle = false }) {
  const [seanceData, setSeanceData] = useState();
  const [thematic, setThematic] = useState({ color: "#C5C5DB", name: "" });
  const [method, setMethod] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadData = async () => {
    const newData = await getSeanceData(user, id);
    setSeanceData(newData);
    const newMethod = await getMethod(newData?.method);
    setMethod(newMethod);
    const newThematic = await getThematic(newData?.thematic);
    setThematic(newThematic);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id, isLoading]);

  if (seanceData) {
    return (
      <Link href={`/seances/${id}`}>
        <a className={styles.a}>
          <div
            className={circle ? styles.circle_card : styles.card}
            style={{ backgroundColor: thematic.color }}
          >
            {!circle && <h3 className={styles.method}>{method.name}</h3>}
            <h2 className={styles.title}>{seanceData.title}</h2>
            {!circle && <Duration seconds={seanceData.media_duration} />}
          </div>
        </a>
      </Link>
    );
  }
}
