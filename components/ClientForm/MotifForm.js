import { useContext, useEffect } from "react";
import createClientContext from "../../context/createClientContext";
import style from "./ClientForm.module.css";

export default function MotifForm() {
  const { clientData, setClientData, setValidation } =
    useContext(createClientContext);

  useEffect(() => {
    if (clientData.motif) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [clientData, setValidation]);

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
        value={clientData?.motif}
        onChange={(e) =>
          setClientData({ ...clientData, motif: e.target.value })
        }
      />
    </form>
  );
}
