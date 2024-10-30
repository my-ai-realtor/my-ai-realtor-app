import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer-container">
    <Container>
      <Row className="text-center mt-4">
        <Col className="d-flex align-items-center justify-content-center">
          <Image
            src="https://cdn.discordapp.com/attachments/1278527340523159609/1300590236551876761/My_ai_realtor_processed.png?ex=6722b60c&is=6721648c&hm=5359ccd562914bccf59211713097624054a7063b09abf6374c56244f57a81efa&"
            alt="My AI Realtor logo"
            id="Logo"
            style={{ width: '200px', height: 'auto' }}
          />
        </Col>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <a href="/terms" className="footer-link-button mx-2">Terms of Service</a>
          <a href="/about" className="footer-link-button mx-2">About Us</a>
          <a href="/faqs" className="footer-link-button mx-2">FAQs</a>
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
