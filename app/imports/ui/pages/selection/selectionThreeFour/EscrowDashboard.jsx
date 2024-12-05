import React from 'react';
import PropTypes from 'prop-types';

const EscrowDashboard = ({ setEscrow, setSelection }) => (
  <>
    <h1>escrowpt</h1>
    <button
      type="button"
      className="empty-button"
      onClick={() => setSelection(0)}
    >
      Next
    </button>
  </>
);

EscrowDashboard.propTypes = {
  setEscrow: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default EscrowDashboard;
