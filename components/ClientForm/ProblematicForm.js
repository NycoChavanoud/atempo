import React, { useContext } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";

export default function ProblematicForm() {
  const { clientData, setClientData } = useContext(createClientContext);

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <label htmlFor="problématique"> </label>
      <textarea
        className={style.problematic}
        id="problematic"
        placeholder="Problématique(s)"
        required
        onChange={(e) =>
          setClientData({ ...clientData, problematic: e.target.value })
        }
      />
    </form>
  );
}
