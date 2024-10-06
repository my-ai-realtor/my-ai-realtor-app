import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Nav, Button, Offcanvas } from 'react-bootstrap';
import AIChatBox from '../components/AIChatBox';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: Fix the auto-scroll issue when opening the chat assistant
// Define mock components for different escrow stages with deadlines
const PropertySearch = () => (
  <div>
    <h2>Property Search</h2>
    <p>Find the perfect property that suits your needs. Our AI-powered assistant can help you discover the best options based on your preferences.</p>
  </div>
);

const Inspection = () => (
  <div>
    <h2>Inspection</h2>
    <p>Schedule a property inspection to ensure that everything is in order before proceeding with the purchase.</p>
  </div>
);

const Financing = () => (
  <div>
    <h2>Financing</h2>
    <p>Get pre-approved for a loan and manage your financing options to secure the best mortgage rate.</p>
  </div>
);

const Closing = () => (
  <div>
    <h2>Closing</h2>
    <p>Complete the escrow process and finalize the transaction. Prepare for the legal paperwork and closing day procedures.</p>
  </div>
);

const Chat = () => (
  <div>
    <h2>Chat</h2>
  </div>
);

const Dashboard = () => {
  // More realistic dashboard structure for a real estate escrow process
  const dashboardData = {
    navItems: [
      { id: 'propertySearch', label: 'Property Search', component: <PropertySearch /> },
      { id: 'inspection', label: 'Inspection', component: <Inspection /> },
      { id: 'financing', label: 'Financing', component: <Financing /> },
      { id: 'closing', label: 'Closing', component: <Closing /> },
      { id: 'chat', label: 'Chat', component: <Chat /> },
    ],
  };

  const [activeComponent, setActiveComponent] = useState(dashboardData.navItems[0].component);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Prevent global scrolling when the user is inside the dashboard
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable global scrolling when leaving the dashboard
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleNavClick = (component) => {
    setActiveComponent(component);
    setShowSidebar(false); // Close sidebar on mobile after selection
  };

  return (
    <Container id="dashboard-page" fluid className="vh-10" style={{ overflow: 'hidden' }}>
      <Row className="h-100">
        {/* Sidebar Toggle Button for mobile */}
        <Button
          variant="primary"
          className="d-md-none mb-3"
          onClick={() => setShowSidebar(true)}
        >
          Open Sidebar
        </Button>

        {/* Offcanvas Sidebar for mobile view */}
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Escrow Process</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {dashboardData.navItems.map(item => (
                <Nav.Link
                  key={item.id}
                  onClick={() => handleNavClick(item.component)}
                  className="py-2 px-3 mb-2 bg-white rounded shadow-sm text-dark"
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Sidebar for desktop view */}
        <Col xs={12} md={3} className="sidebar bg-light p-3 d-none d-md-block" style={{ overflowY: 'auto', height: '100vh' }}>
          <h4 className="mb-4">Escrow Process</h4>
          <Nav className="flex-column">
            {dashboardData.navItems.map(item => (
              <Nav.Link
                key={item.id}
                onClick={() => handleNavClick(item.component)}
                className="py-2 px-3 mb-2 bg-white rounded shadow-sm text-dark"
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col xs={12} md={9} className="content p-4" style={{ overflowY: 'auto', height: '100vh' }}>
          {activeComponent}
        </Col>
      </Row>
      <AIChatBox />
    </Container>
  );
};

export default Dashboard;
