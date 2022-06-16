import { createContext, useState } from "react";

const createSeanceContext = createContext();

export function CreateSeanceContextProvider({ children }) {
  const [seanceData, setSeanceData] = useState({});
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
      }}
    >
      {children}
    </createSeanceContext.Provider>
  );
}

export default createSeanceContext;
