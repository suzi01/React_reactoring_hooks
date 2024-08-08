import React, { useState } from "react";
import Select from "./Select";
import DataFetching from "./DataFetching";

if (process.env.NODE_ENV === "development") {
  const { Server } = require("miragejs");
  const { sales, subscriptions } = require("../../mocks");

  new Server({
    routes() {
      this.namespace = "/api/";
      this.get("/sales/", () => {
        return {
          dataCollected: [...sales],
          subscriptionsTotal: 2311,
          salesTotal: 2222,
        };
      });

      this.get("/subscriptions/", () => {
        return {
          dataCollected: [...subscriptions],
          subscriptionsTotal: 2421,
          salesTotal: 5621,
        };
      });
    },
  });
}

const DataFetchingContainer = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("");

  const optionsForSelect = [
    { label: "Sales", value: `${process.env.REACT_APP_BASE_URL}/sales/` },
    {
      label: "Subscriptions",
      value: `${process.env.REACT_APP_BASE_URL}/subscriptions/`,
    },
  ];

  /* handleSelectChange function */
  const handleSelectChange = (event) => {
    setSelectedEndpoint(event.target.value);
  };

  return (
    <>
      <Select
        handleChange={handleSelectChange}
        label="Please, select a chart"
        id="select-chart"
        options={optionsForSelect}
      />
      {selectedEndpoint ? <DataFetching endpoint={selectedEndpoint} /> : null}
    </>
  );
};

export default DataFetchingContainer;
