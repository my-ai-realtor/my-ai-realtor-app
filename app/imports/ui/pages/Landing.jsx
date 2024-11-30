import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landing = () => (
  <Container id="landing-page" fluid className="landing-page-bg vh-100">
    <Row className="h-100">
      <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-start text-box">
        <h1 className="header-title">My AI Realtor</h1>
        <p>Discover a seamless home-buying experience with our AI-powered assistant. From finding the perfect property to closing the deal, we&apos;re here to support you every step of the way.</p>
        <div className="button-group mt-3"> {/* Add margin-top for space between text and buttons */}
          <Link to="/signin">
            <Button variant="light">Get Started</Button>
          </Link>
          <Button variant="outline-light" className="mx-2">Learn More</Button>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Landing;
