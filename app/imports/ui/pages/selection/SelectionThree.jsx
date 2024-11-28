import React from 'react';
import PropTypes from 'prop-types';

const SelectionThree = ({ setSelection }) => (
  <button type="button" className="empty-button" onClick={() => setSelection(4)}>Next</button>
);

SelectionThree.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionThree;
