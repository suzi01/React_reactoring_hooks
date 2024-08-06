import React, { useState } from "react";
import DashboardShell from "./features/Dashboard/DashboardShell";
import { DataProvider } from "./context/dataContext";

const App = () => {
  const [endpoint, setEndpoint] = useState("");

  // console.log(endpoint);

  return (
    <DataProvider endpoint={endpoint}>
      <DashboardShell fetchDataset={setEndpoint} />
    </DataProvider>
  );
};

export default App;
