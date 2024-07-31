import React from "react";
import PropTypes from "prop-types";

const Select = ({ handleChange, label, id, options }) => {
  return (
    <label>
      {label}
      <select id={id} onChange={handleChange}>
        <option value="">--</option>
        {options.map((element, index) => (
          <option key={index} value={element.value}>
            {element.label}
          </option>
        ))}
      </select>
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
