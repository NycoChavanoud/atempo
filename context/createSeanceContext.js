import { createContext, useState } from "react";

const createSeanceContext = createContext();

export function CreateSeanceContextProvider({ children }) {
  const [seanceData, setSeanceData] = useState({ title: "" });
  const [media, setMedia] = useState({});
  const [completedStep, setCompletedStep] = useState(false);
  const [currentSeanceId, setCurrentSeanceId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [urlSource, setUrlSource] = useState();

  return (
    <createSeanceContext.Provider
      value={{
        urlSource,
        setUrlSource,
        isLoading,
        setIsLoading,
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
