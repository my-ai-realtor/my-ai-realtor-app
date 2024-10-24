import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer-container">
    <Row className="text-center">
      <Col>
        <h3>My AI Realtor</h3>
        <p>Hello, we are ABC. Trying to make an effort to put the right people for you to get the best results. Just insight.</p>
      </Col>
    </Row>
    <Row className="text-center">
      <Col>
        <a href="/terms" className="footer-link-button mx-2">Terms of Service</a>
        <a href="/about" className="footer-link-button mx-2">About Us</a>
        <a href="/faqs" className="footer-link-button mx-2">FAQs</a>
      </Col>
    </Row>
    <Row className="text-center mt-4">
      <Col>
        <div className="footer-logo mb-3">
          <img src="/path-to-your-logo" alt="Logo" width="50" /> 
        </div>
        <p>© 2022 ABC. All Rights Reserved.</p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
