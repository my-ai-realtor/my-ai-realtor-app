import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';

const Initial = ({ setOffer }) => (
  <Container fluid className="selection-2 gray-background my-4">
    <Row className="h-100">
      <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-start text-box">
        <h1 className="header-title">Offer Status</h1>
        <p>Have You Made an Offer Yet?</p>
        <div className="button-group mt-3"> {/* Add margin-top for space between text and buttons */}
          <button type="button" onClick={() => setOffer(1)}>Yes</button>
          <button type="button" onClick={() => setOffer(2)}>No</button>
        </div>
      </Col>
    </Row>
  </Container>
);

Initial.propTypes = {
  setOffer: PropTypes.func.isRequired,
};

export default Initial;
