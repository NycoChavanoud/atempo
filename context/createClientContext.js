import { createContext, useState } from "react";

const createClientContext = createContext();

export function CreateClientContextProvider({ children }) {
  const [clientData, setClientData] = useState({});
  const [validation, setValidation] = useState(false);
  return (
    <createClientContext.Provider
      value={{
        clientData,
        setClientData,
        validation,
        setValidation,
      }}
    >
      {children}
    </createClientContext.Provider>
  );
}

export default createClientContext;
