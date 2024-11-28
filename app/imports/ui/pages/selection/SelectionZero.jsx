import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SelectionZero = ({ setSelection }) => (
  <Container is>
    <Row>
      <h2>Which of these best describes your situation?</h2>
    </Row>
    <Row>
      <button type="button" onClick={() => setSelection(1)} className="empty-button">
        1. I have homes I’m interested in, I’d like help evaluating them
      </button>
    </Row>
    <Row>
      <button type="button" onClick={() => setSelection(2)} className="empty-button">
        2. I would like to make an offer or have a response to an offer on a home I’m interested in
      </button>
    </Row>
    <Row>
      <button type="button" onClick={() => setSelection(3)} className="empty-button">
        3. I have a purchase contract and I’d like help managing the escrow process
      </button>
    </Row>
    <Row>
      <button type="button" onClick={() => setSelection(4)} className="empty-button">
        4. I own the property, I’d like help with next steps
      </button>
    </Row>
  </Container>
);

SelectionZero.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionZero;
