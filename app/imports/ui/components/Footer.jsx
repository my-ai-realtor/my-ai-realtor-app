import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer-container">
    <Container>
      <Row className="text-center mt-4">
        <Col className="d-flex align-items-center justify-content-center">
          <Image
            src="/images/my-ai-realtor-logo_1-removebg.png"
            fluid
            alt="My AI Realtor logo"
            id="Logo"
            style={{ width: '75px', height: 'auto' }}
          />
        </Col>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <a href="/terms" className="footer-link-button mx-2">Terms of Service</a>
          <a href="/about" className="footer-link-button mx-2">About Us</a>
          <a href="/learnmore" className="footer-link-button mx-2">FAQs</a>
        </Col>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <p>© 2024 MyAIRealtor. All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
