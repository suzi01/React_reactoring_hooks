import React, { useState } from "react";
import DashboardShell from "./features/Dashboard/DashboardShell";
import { DataProvider } from "./context/dataContext";
import DataFetchingContainer from "./common/components/DataFetchingContainer";

const App = () => {

  return (
    <DataProvider>
      <DashboardShell />
    </DataProvider>
  );
  // return <DataFetchingContainer />;
};

export default App;
