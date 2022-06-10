import { createContext, useState } from "react";

const createSeanceContext = createContext();

export function CreateSeanceContextProvider({ children }) {
  const [seanceData, setSeanceData] = useState({});
  const [submitStep, setSubmitStep] = useState(() => {
    setSeanceData({ ...seanceData });
  });

  return (
    <createSeanceContext.Provider
      value={{
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
