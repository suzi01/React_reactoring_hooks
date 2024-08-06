import React, { createContext, useContext } from "react";

import useFetch from "../Hooks/useFetch";

const dataContext = createContext();

// const value = {
//   error: "",
//   loading: false,
//   data: sales,
//   salesTotal: 2324,
//   subscriptionsTotal: 12331,
// };

const DataProvider = ({ children, endpoint }) => {
  const value = useFetch(endpoint);

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
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
