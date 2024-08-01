import { useEffect, useReducer } from "react";
import dataReducer from "../reducer/dataReducer";

const useFetch = (endpoint) => {
  const initialState = {
    error: "",
    loading: false,
    data: [],
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(endpoint.endpoint)
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
