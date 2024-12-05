import React from 'react';
import PropTypes from 'prop-types';

const SelectionFour = ({ setSelection }) => (
  <>
    <h1>selection 4 pg</h1>
    <button
      type="button"
      className="empty-button"
      onClick={() => setSelection(0)}
    >
      Next
    </button>
  </>
);

SelectionFour.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionFour;
