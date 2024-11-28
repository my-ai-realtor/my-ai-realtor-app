import React from 'react';
import PropTypes from 'prop-types';

const SelectionFour = ({ setSelection }) => (
  <button type="button" className="empty-button" onClick={() => setSelection(0)}>Next</button>
);

SelectionFour.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionFour;
