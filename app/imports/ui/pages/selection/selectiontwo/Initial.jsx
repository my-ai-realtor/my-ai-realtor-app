import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Initial = ({ setOffer }) => (
  <Container fluid className="selection-2 gray-background my-4">
    <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Col xs={12} md={6} className="text-center">
        <h1 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Offer Status</h1>
        <p style={{ fontSize: '1.25rem' }}>Have you made an offer yet?</p>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            size="lg"
            className="me-3"
            onClick={() => setOffer(1)}
          >
            <FaCheckCircle className="me-2" /> Yes
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={() => setOffer(2)}
          >
            <FaTimesCircle className="me-2" /> No
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
);

Initial.propTypes = {
  setOffer: PropTypes.func.isRequired,
};

export default Initial;
