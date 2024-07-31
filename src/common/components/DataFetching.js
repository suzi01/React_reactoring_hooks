import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DataFetching = (selectedEndpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(selectedEndpoint.endpoint)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedEndpoint]);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{`${item.timestamp} - ${item.amount}`}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

DataFetching.propTypes = {
  selectedEndpoint: PropTypes.string,
};

export default DataFetching;
