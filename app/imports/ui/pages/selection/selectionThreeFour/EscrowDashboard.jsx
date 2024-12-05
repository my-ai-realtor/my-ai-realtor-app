import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';

const EscrowDashboard = ({ setEscrow, setSelection }) => (
  <Container className="py-3">
    <h1>escrowpt</h1>
    <Button type="button" onClick={() => setEscrow(0)} className="getting-started-link">Back</Button>
    {'                    '}
    <Button type="button" onClick={() => setSelection(4)} className="getting-started-link">Next</Button>
  </Container>
);

EscrowDashboard.propTypes = {
  setEscrow: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default EscrowDashboard;
