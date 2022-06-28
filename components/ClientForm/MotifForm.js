import { useContext } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";

export default function MotifForm() {
  const { clientData, setClientData } = useContext(createClientContext);

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <label htmlFor="motif"> </label>
      <textarea
        className={style.motif}
        id="motif"
        placeholder="Motif(s)"
        onChange={(e) =>
          setClientData({ ...clientData, motif: e.target.value })
        }
      />
    </form>
  );
}
