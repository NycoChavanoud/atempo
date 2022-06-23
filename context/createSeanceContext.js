import { createContext, useState } from "react";

const createSeanceContext = createContext();

export function CreateSeanceContextProvider({ children }) {
  const [seanceData, setSeanceData] = useState({});
  const [media, setMedia] = useState({});
  const [currentSeanceId, setCurrentSeanceId] = useState();
  const [submitStep, setSubmitStep] = useState(() => {
    setSeanceData({ ...seanceData });
  });

  return (
    <createSeanceContext.Provider
      value={{
        currentSeanceId,
        setCurrentSeanceId,
        seanceData,
        setSeanceData,
        submitStep,
        setSubmitStep,
        media,
        setMedia,
      }}
    >
      {children}
    </createSeanceContext.Provider>
  );
}

export default createSeanceContext;
