import React, { useState } from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";

import Select from "../../common/components/Select";
import { useData } from "../../context/dataContext";

// if (process.env.NODE_ENV === "development") {
//   const { Server } = require("miragejs");
//   const { sales, subscriptions } = require("../../mocks");

//   new Server({
//     routes() {
//       this.namespace = process.env.REACT_APP_BASE_URL;
//       this.get("sales/", () => sales);
//       this.get("subscriptions/", () => subscriptions);
//     },
//   });
// }

const DashboardShell = ({ fetchDataset }) => {
  const [selectedLabel, setSelectedLabel] = useState("");

  // componentDidMount() {
  //   this.props.fetchDataset(`${process.env.REACT_APP_BASE_URL}/totals/`);
  // }

  const handleSelectChange = (event) => {
    fetchDataset(event.target.value);
    const selectedLabel = event.target.selectedOptions[0].label;
    setSelectedLabel(selectedLabel);
  };

  const optionsForSelect = [
    { label: "Sales", value: `${process.env.REACT_APP_BASE_URL}/sales/` },
    {
      label: "Subscriptions",
      value: `${process.env.REACT_APP_BASE_URL}/subscriptions/`,
    },
  ];

  return (
    <Layout>
      <Aside>
        <h2># Polly dashboard</h2>
        <Select
          handleChange={handleSelectChange}
          label="Please select a chart:"
          id="select-product"
          options={optionsForSelect}
        />
      </Aside>
      <Main>
        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>
        <SummaryContainer />
        <ChartContainer selectedLabel={selectedLabel} />
      </Main>
    </Layout>
  );
};

export default DashboardShell;
