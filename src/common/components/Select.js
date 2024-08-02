import React from "react";
import PropTypes from "prop-types";

const Select = ({ handleChange, label, id, options }) => {
  return (
    <label>
      {label}
      <div>
        <select id={id} onChange={handleChange}>
          <option value="">--</option>
          {options.map((element, index) => (
            <option key={index} value={element.value}>
              {element.label}
            </option>
          ))}
        </select>
        <div className="chevron-wrapper flex">
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </label>
  );
};

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;
