import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import SelectionZero from './SelectionZero';
import SelectionOne from './SelectionOne';
import SelectionTwo from './SelectionTwo';
import SelectionThree from './SelectionThree';
import SelectionFour from './SelectionFour';

const Selection = () => {
  const pages = {};
  const stepsButtons = {};
  const titles = {};
  titles[1] = 'Interest';
  titles[2] = 'Offer';
  titles[3] = 'Escrow';
  titles[4] = 'Interest';
  const stepCount = 5;
  const saved = sessionStorage.getItem('selection');
  const init = (saved !== null ? parseInt(saved, 10) : 0);
  const [selection, setSelection] = useState(init);
  useEffect(() => {
    sessionStorage.setItem('selection', selection);
  });

  pages[0] = <SelectionZero setSelection={setSelection} />;
  pages[1] = <SelectionOne setSelection={setSelection} />;
  pages[2] = <SelectionTwo setSelection={setSelection} />;
  pages[3] = <SelectionThree setSelection={setSelection} />;
  pages[4] = <SelectionFour setSelection={setSelection} />;
  for (let i = 1; i < stepCount; i++) {
    stepsButtons[i] =
        (
          <Col className="d-flex align-items-center justify-content-center">
            <p className="terms-text">{titles[i]}</p>
          </Col>
        );
  }

  return (
    <Container className="py-3">
      <Row>
        <h2 id="prog-title">Progress</h2>
      </Row>
      <Row>
        <progress value={selection / stepCount} id="selection-progbar" />
      </Row>
      <Row>
        {Object.values(stepsButtons)}
      </Row>
      <Row>
        {pages[selection]}
      </Row>
      <Row>
        <button type="button" className="empty-button" onClick={() => setSelection(0)}>Back to the Beginning</button>
      </Row>

    </Container>
  );
};

export default Selection;
