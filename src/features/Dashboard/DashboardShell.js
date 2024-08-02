import React, { useState } from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
import { fetchDataset } from "./DashboardSlice";
import Select from "../../common/components/Select";
import { useData } from "../../context/dataContext";

const DashboardShell = () => {
  const [selectedLabel, setSelectedLabel] = useState("");
  // constructor(props) {
  //   super(props);
  //   this.state = { selectedLabel: "" };

  //   this.handleSelectChange = this.handleSelectChange.bind(this);
  // }
  const { data } = useData();

  // componentDidMount() {
  //   this.props.fetchDataset(`${process.env.REACT_APP_BASE_URL}/totals/`);
  // }

  const handleSelectChange = (event) => {
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
