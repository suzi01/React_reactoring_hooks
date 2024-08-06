const dataReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "loaded":
      return { ...state, loading: false };
    case "error":
      return { ...state, error: action.payload };
    case "data":
      return { ...state, data: { ...action.payload } };
    default:
      return state;
  }
};

export default dataReducer;
