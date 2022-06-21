import { createContext, useState } from "react";

const createClientContext = createContext();

export function CreateClientContextProvider({ children }) {
  const [clientData, setClientData] = useState({});
  return (
    <createClientContext.Provider
      value={{
        clientData,
        setClientData,
      }}
    >
      {children}
    </createClientContext.Provider>
  );
}

export default createClientContext;
