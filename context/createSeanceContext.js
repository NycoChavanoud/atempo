import { createContext, useState } from "react";

const createSeanceContext = createContext();

export function CreateSeanceContextProvider({ children }) {
  const [seanceData, setSeanceData] = useState({});
  const [media, setMedia] = useState({});
  const [completedStep, setCompletedStep] = useState(false);
  const [currentSeanceId, setCurrentSeanceId] = useState();

  return (
    <createSeanceContext.Provider
      value={{
        currentSeanceId,
        setCurrentSeanceId,
        seanceData,
        setSeanceData,
        media,
        setMedia,
        completedStep,
        setCompletedStep,
      }}
    >
      {children}
    </createSeanceContext.Provider>
  );
}

export default createSeanceContext;
