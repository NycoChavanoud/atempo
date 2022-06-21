import React, { useContext } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";
import Router from "next/router";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createClient from "../../model/client";

export default function ProblematicForm() {
  const { clientData, setClientData } = useContext(createClientContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientId = await createClient(clientData);
    createClient(clientId, { ...clientData });
    setClientData({});

    toast("Client sauvegardé.", {
      theme: "dark",
      type: "success",
      position: "bottom-center",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="probématique"> </label>
        <textarea
          data-cy="problematic"
          className={style.problematic}
          id="problematic"
          placeholder="Problématique(s)"
          required
          onChange={(e) =>
            setClientData({ ...clientData, problematic: e.target.value })
          }
        />
        <div className={style.box}>
          <div onClick={() => Router.back()} className={style.submitbtn}>
            <ArrowCircleLeftIcon
              sx={{
                width: "40px",
                height: "40px",
                color: "var(--color1)",
              }}
            />
          </div>
          <Link href="/clients">
            <button
              type="submit"
              id="btn"
              style={{
                width: "150px",
                height: "50px",
                background: "#F98F83",
                color: "white",
                borderRadius: "20px",
                fontWeight: "bolder",
              }}
            >
              Confirmer
            </button>
          </Link>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </>
  );
}
