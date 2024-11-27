// GettingStarted.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GettingStarted = () => (
  <Container fluid className="getting-started-container">
    <Row className="text-center">
      <Col>
        <h2 className="getting-started-title">Getting Started</h2>
        <p className="getting-started-subtitle">What step in your buying process are you at?</p>
        <ul className="getting-started-list">
          <li className="getting-started-list-item">
            <Link to="/step1" className="getting-started-link">
              1. I have homes I am interested in, I would like help evaluating them.
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step2" className="getting-started-link">
              2. I would like to make an offer or have a response to an offer on a home I’m interested in.
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step3" className="getting-started-link">
              3. I have a purchase contract and I’d like help managing the escrow process
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step4" className="getting-started-link">
              4. I own the property, I’d like help with next steps
            </Link>
          </li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default GettingStarted;
