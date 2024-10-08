import React, { useState } from 'react';
import { Col, Container, Row, Nav, Button, Offcanvas } from 'react-bootstrap';
import AIChatBox from '../components/AIChatBox';
import ChatAssistantPage from './ChatAssistant';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define mock components for different escrow stages with deadlines
const PropertySearch = () => (
  <div>
    <h2>Property Search</h2>
    <p>
      Find the perfect property that suits your needs. Our AI-powered assistant can help you discover the best options based on your preferences.
    </p>
  </div>
);

const Inspection = () => (
  <div>
    <h2>Inspection</h2>
    <p>
      Schedule a property inspection to ensure that everything is in order before proceeding with the purchase.
    </p>
  </div>
);

const Financing = () => (
  <div>
    <h2>Financing</h2>
    <p>
      Get pre-approved for a loan and manage your financing options to secure the best mortgage rate.
    </p>
  </div>
);

const Closing = () => (
  <div>
    <h2>Closing</h2>
    <p>
      Complete the escrow process and finalize the transaction. Prepare for the legal paperwork and closing day procedures.
    </p>
  </div>
);

const Chat = () => (
  <div>
    <ChatAssistantPage />
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

  const [activeComponentId, setActiveComponentId] = useState(dashboardData.navItems[0].id);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavClick = (item) => {
    setActiveComponentId(item.id);
    setShowSidebar(false); // Close sidebar on mobile after selection
  };

  // Find the active component based on the activeComponentId
  const activeComponent = dashboardData.navItems.find(item => item.id === activeComponentId).component;

  return (
    <Container id="dashboard-page" fluid>
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
                  onClick={() => handleNavClick(item)}
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
        <Col
          xs={12}
          md={3}
          className="sidebar bg-light p-3 d-none d-md-block"
          style={{ width: '250px', overflowY: 'auto', height: '100vh' }}
        >
          <h4 className="mb-4">Escrow Process</h4>
          <Nav className="flex-column">
            {dashboardData.navItems.map(item => (
              <Nav.Link
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="py-2 px-3 mb-2 bg-white rounded shadow-sm text-dark"
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col
          xs={12}
          md={9}
          className="content p-0"
          style={{ overflowY: 'auto', height: '100vh' }}
        >
          {activeComponent}
        </Col>
      </Row>

      {/* Conditionally render AIChatBox */}
      {activeComponentId !== 'chat' && <AIChatBox />}
    </Container>
  );
};

export default Dashboard;
