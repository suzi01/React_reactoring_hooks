import React, { createContext, useContext, useState } from "react";

import useFetch from "../Hooks/useFetch";

const dataContext = createContext();

// const value = {
//   error: "",
//   loading: false,
//   data: sales,
//   salesTotal: 2324,
//   subscriptionsTotal: 12331,
// };

const DataProvider = ({ children }) => {
  const [endpoint, setEndpoint] = useState("");
  const value = useFetch(endpoint);

  const updateEndpoint = endpoint => setEndpoint(endpoint);

  return <dataContext.Provider value={{...value, updateEndpoint}}>{children}</dataContext.Provider>;
};

const useData = () => {
  const context = useContext(dataContext);
  if (context === undefined) {
    throw new Error(
      "An error has occured, consider reviewing useContext usage"
    );
  }
  return context;
};

export { DataProvider, useData };
