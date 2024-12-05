import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { CloudDownload } from 'react-bootstrap-icons';
import EscrowDashboard from './EscrowDashboard';

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

  eDashboard[0] = <EscrowDashboard setEscrow={setEscrow} setSelection={setSelection} />;

  // <button type="button" className="empty-button" onClick={() => setSelection(4)}>Next</button>;

  return (
    <Container className="py-3">
      <Row>
        <h3 className="text-center">Please Upload the Purchase Contract</h3>
        <Col>
          <text className="square">
            <Form.Group controlId="formFile">
              <CloudDownload className="cloud-download" />
              <Form.Control type="file" size="sm" />
            </Form.Group>
          </text>
        </Col>
        <h4>1) Do you have an inspector?</h4>
        <Form className="justify-content-center">
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                label="Yes"
                name="group1"
                type={type}
              />
              <Form.Check
                label="No"
                name="group1"
                type={type}
              />
            </div>
          ))}
        </Form>
        <h4>2) Do you have an Escrow company?</h4>
        <Form className="justify-content-center">
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                label="Yes"
                name="group1"
                type={type}
              />
              <Form.Check
                label="No"
                name="group1"
                type={type}
              />
            </div>
          ))}
        </Form>
        <h4>3) Do you have an termite inspection?</h4>
        <Form className="justify-content-center">
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                label="Yes"
                name="group1"
                type={type}
              />
              <Form.Check
                label="No"
                name="group1"
                type={type}
              />
            </div>
          ))}
        </Form>
        <h4>4) Do you have an Home owner insurance?</h4>
        <Form className="justify-content-center">
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                label="Yes"
                name="group1"
                type={type}
              />
              <Form.Check
                label="No"
                name="group1"
                type={type}
              />
            </div>
          ))}
        </Form>
      </Row>
      {eDashboard[escrow]}
      <Button type="button" onClick={() => setEscrow(0)} className="getting-started-link">Next</Button>
    </Container>
  );
};

SelectionThree.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionThree;
