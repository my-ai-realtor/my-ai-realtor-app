import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Card } from 'react-bootstrap';

const Finance = ({ setSelection }) => (
  <Container fluid className="gray-background my-4">

    <Row className="h-100">
      <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-start text-box">
        <h1 className="header-title">Need a Hand?</h1>
        <p>Here are some real-estate services we think you might be interested in</p>
        <Col>
          <h2>Loan Opportunities</h2>
          <Card>
            <Card.Body>
              <button type="button" className="getting-started-link">
                Loan Company One
              </button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <button type="button" className="getting-started-link">
                Loan Company Two
              </button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <button type="button" className="getting-started-link">
                Loan Company Three
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h1>Real Estate Lawyers</h1>
          <Card>
            <Card.Body>
              <button type="button" className="getting-started-link">
                Lawyer One
              </button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <button type="button" className="getting-started-link">
                Lawyer Two
              </button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <button type="button" className="getting-started-link">
                Lawyer Three
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Col>
      <button type="button" className="getting-started-link" onClick={() => setSelection(3)}>
        Go to Offer Dashboard
      </button>
    </Row>
  </Container>
);
Finance.propTypes = {
  setSelection: PropTypes.func.isRequired,
};
export default Finance;
