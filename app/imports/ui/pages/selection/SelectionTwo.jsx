import React from 'react';
import PropTypes from 'prop-types';

const SelectionTwo = ({ setSelection }) => (
  <button type="button" className="empty-button" onClick={() => setSelection(3)}>Next</button>
);

SelectionTwo.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionTwo;
