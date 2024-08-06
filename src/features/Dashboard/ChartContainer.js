import React from "react";
import LineChart from "./LineChart";
import PropTypes from "prop-types";
import { useData } from "../../context/dataContext";

const ChartContainer = ({ selectedLabel }) => {
  // const { data: dataset } = useData();

  const {
    data: { dataCollected: dataset },
  } = useData();

  // console.log(dataset);

  const chartLabels = dataset.map((dataPoint) => dataPoint.timestamp);
  const chartValues = dataset.map((dataPoint) => dataPoint.amount);

  return (
    <div>
      <LineChart
        chartLabels={chartLabels}
        chartValues={chartValues}
        label={selectedLabel}
      />
    </div>
  );
};

ChartContainer.propTypes = {
  selectedLabel: PropTypes.string.isRequired,
};

export default ChartContainer;
