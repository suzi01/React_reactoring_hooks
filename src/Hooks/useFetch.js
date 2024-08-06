import { useEffect, useReducer } from "react";
import dataReducer from "../reducer/dataReducer";

const useFetch = (endpoint) => {
  const initialState = {
    error: "",
    loading: false,
    data: { dataCollected: [], subscriptionsTotal: 2304, salesTotal: 2235 },
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    if (
      !endpoint
      // || endpoint === "/api/totals/"
    )
      return;
    dispatch({ type: "loading" });
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        dispatch({ type: "data", payload: json });
      })
      .catch((error) => {
        dispatch({ type: "error", payload: error });
      })
      .finally(() => {
        dispatch({ type: "loaded" });
      });
  }, [endpoint]);

  return state;
};

export default useFetch;
