import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "../../../styles/Seances.module.css";
import { useRouter } from "next/router";
import {
  getSeanceData,
  updateSeance,
  updateSeanceMedia,
} from "../../../model/seances";
import EditIcon from "@mui/icons-material/Edit";
import WhiteBurger from "../../../components/WhiteBurger/WhiteBurger";
import { toast } from "react-toastify";
import DesktopMenu from "../../../components/DesktopMenu/DesktopMenu";

export default function EditSeance() {
  const [seanceData, setSeanceData] = useState();
  const [media, setMedia] = useState();
  const router = useRouter();
  const { id } = router.query;

  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  };

  const handleFile = () => {
    setSeanceData({
      ...seanceData,
      media_name: fileInput.current.files[0].name,
    });
    setMedia(fileInput.current.files[0]);
  };

  const success = () =>
    toast.success("Les modifications ont été enregistrées", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const submitChange = () => {
    updateSeance(id, {
      ...seanceData,
    });
    if (media) {
      const newMediaUrl = updateSeanceMedia(
        media,
        id,
        seanceData.media_name,
        seanceData.media_url
      );
      updateSeance(id, {
        media_url: newMediaUrl,
      });
    }
    success();
    router.push(`/seances/${id}`);
  };

  useEffect(() => {
    getSeanceData(id).then(setSeanceData);
  }, [id]);

  return (
    seanceData && (
      <Layout pageTitle="Modifier une séance" shape={true}>
        <div className={styles.boxes}>
          <div>
            <DesktopMenu />
          </div>
          <div className="lg:flex lg:flex-col  lg:items-center">
            <WhiteBurger />
            <h1 className={styles.create_title}>Modifier la séance</h1>
            <div className={styles.editForm}>
              <label className={styles.edit_label} htmlFor="titre">
                {" "}
                <input
                  className={styles.edit_title}
                  type="text"
                  id="title"
                  value={seanceData.title}
                  required
                  onChange={(e) =>
                    setSeanceData({ ...seanceData, title: e.target.value })
                  }
                />
              </label>
              <label className={styles.edit_label} htmlFor="description">
                {" "}
                <textarea
                  className={`${styles.edit_description}`}
                  id="description"
                  value={seanceData.description}
                  required
                  onChange={(e) =>
                    setSeanceData({
                      ...seanceData,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <label
                className={styles.edit_label}
                htmlFor="method-select"
                required
              >
                <select
                  className={styles.edit_select}
                  name="method"
                  id="method-select"
                  value={seanceData.method || ""}
                  required
                  onChange={(e) =>
                    setSeanceData({ ...seanceData, method: e.target.value })
                  }
                >
                  <option value="">--Choisissez une méthode--</option>
                  <option value="sophrologie">Sophrologie</option>
                  <option value="meditation">Méditation</option>
                  <option value="yoga">Yoga</option>
                  <option value="voyages_sonores">Voyages Sonores</option>
                  <option value="coherence_cardiaque">
                    Cohérence Cardiaque
                  </option>
                  <option value="autre">Autre</option>
                </select>{" "}
                {seanceData.method === "autre" && (
                  <input
                    className={styles.edit_otherInput}
                    type="text"
                    id="other_method"
                    placeholder={"Précisez ici"}
                    value={seanceData.other_method}
                    required
                    onChange={(e) => {
                      setSeanceData({
                        ...seanceData,
                        other_method: e.target.value,
                      });
                    }}
                  />
                )}
              </label>
              <label className={styles.edit_label} htmlFor="thematic">
                {" "}
                <select
                  className={styles.edit_select}
                  name="thematic"
                  id="thematic-select"
                  value={seanceData.thematic || ""}
                  required
                  onChange={(e) =>
                    setSeanceData({ ...seanceData, thematic: e.target.value })
                  }
                >
                  <option value="">--Choisissez un théme--</option>
                  <option value="decouverte">Découverte</option>
                  <option value="sommeil">Sommeil</option>
                  <option value="energie">Energie</option>
                  <option value="grossesse">Grossesse</option>
                  <option value="stress">Stress</option>
                  <option value="enfant">Enfant</option>
                  <option value="emotion">Emotion</option>
                  <option value="mental">Mental</option>
                  <option value="autre">Autre</option>
                </select>
                {seanceData.thematic === "autre" && (
                  <input
                    className={styles.edit_otherInput}
                    type="text"
                    id="other_thematic"
                    placeholder={"Précisez ici"}
                    value={seanceData.other_thematic}
                    required
                    onChange={(e) =>
                      setSeanceData({
                        ...seanceData,
                        other_thematic: e.target.value,
                      })
                    }
                  />
                )}
              </label>
              <label className={styles.edit_media} htmlFor="mp3_url">
                {" "}
                <p className="w-[80%]">
                  {seanceData.media_name || "Aucun média associé"}
                </p>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInput}
                  onChange={handleFile}
                />
                <button
                  onClick={selectFile}
                  type="button"
                  className={styles.edit_btn}
                >
                  <EditIcon />
                </button>
              </label>

              <button className={styles.submitEdit_btn} onClick={submitChange}>
                Soumettre
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
}
