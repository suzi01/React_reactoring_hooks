import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import useFetch from "../../Hooks/useFetch";

const DataFetching = (selectedEndpoint) => {
  const { loading, error, data } = useFetch(selectedEndpoint);

  return (
    <div>
      {loading && <Loading />}
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{`${item.timestamp} - ${item.amount}`}</li>
          ))}
        </ul>
      ) : (
        <p>There is no data</p>
      )}
      {<p>Error: {error.message}</p>}
    </div>
  );
};

DataFetching.propTypes = {
  selectedEndpoint: PropTypes.string,
};

export default DataFetching;
