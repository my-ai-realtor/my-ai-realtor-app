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
              1. I know what house I want and need to come up with comp prices and an offer
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step2" className="getting-started-link">
              2. I know what house I want and just need help with the offer
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step3" className="getting-started-link">
              3. I got my offer on a house accepted already and need help with remaining steps
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step4" className="getting-started-link">
              4. I got my offer rejected and need help with what to do next.
            </Link>
          </li>
          <li className="getting-started-list-item">
            <Link to="/step5" className="getting-started-link">
              5. I have bought the home. I need help with what to do next.
            </Link>
          </li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default GettingStarted;
