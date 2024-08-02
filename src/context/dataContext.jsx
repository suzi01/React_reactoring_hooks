import React, { createContext, useContext } from "react";

import { sales } from "../mocks";

const dataContext = createContext();

const initialState = {
  error: "",
  loading: false,
  data: sales,
  salesTotal: 0,
  subscriptionsTotal: 0,
};

const DataProvider = ({ children }) => {
  return (
    <dataContext.Provider value={initialState}>{children}</dataContext.Provider>
  );
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
