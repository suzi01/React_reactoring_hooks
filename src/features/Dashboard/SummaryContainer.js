import React from "react";
import { useData } from "../../context/dataContext";
import useFetch from "../../Hooks/useFetch";

const SummaryContainer = () => {
  // const { salesTotal, subscriptionsTotal } = useData();
  const {
    data: { salesTotal, subscriptionsTotal },
  } = useFetch(`${process.env.REACT_APP_BASE_URL}/totals/`);
  return (
    <div className="summary flex flex-row">
      <div className="card bg-indigo">
        <p>CellFast sales</p>
        <p>$ {salesTotal}</p>
      </div>
      <div className="card bg-blue">
        <p>CellNow subscriptions</p>
        <p>$ {subscriptionsTotal}</p>
      </div>
    </div>
  );
};

export default SummaryContainer;
