import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button } from 'react-bootstrap';
import EscrowDashboard from './EscrowDashboard';
import QuestionsSelectionThree from './QuestionsSelectionThree';

const SelectionThree = ({ setSelection }) => {
  const saved = sessionStorage.getItem('escrow');
  const init = (saved !== null ? parseInt(saved, 10) : 0);
  const [escrow, setEscrow] = useState(init);
  useEffect(
    () => {
      sessionStorage.setItem('escrow', escrow);
    },
  );
  const eDashboard = {};

  eDashboard[0] = <QuestionsSelectionThree setEscrow={setEscrow} setSelection={setSelection} />;
  eDashboard[1] = <EscrowDashboard setEscrow={setEscrow} setSelection={setSelection} />;

  // <button type="button" className="empty-button" onClick={() => setSelection(4)}>Next</button>;

  return (
    <Container className="py-3">
      <Row>
        {eDashboard[escrow]}
      </Row>
      <Row>
        <Button type="button" onClick={() => setEscrow(0)} className="getting-started-link">Next</Button>
      </Row>
    </Container>
  );
};

SelectionThree.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionThree;
