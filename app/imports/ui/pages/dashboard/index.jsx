import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Col, Container, Row, Nav, Button, Offcanvas } from 'react-bootstrap';
import AIChatBox from '../../components/AIChatBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dashboardConfig } from './dashboardConfig';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const location = useLocation();

  return (
    <Container id="dashboard-page" fluid>
      <Button
        variant="primary"
        className="d-md-none mb-3"
        onClick={() => setShowSidebar(true)}
      >
        Open Sidebar
      </Button>

      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        className="d-md-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {dashboardConfig.sections.map((section) => (
              <React.Fragment key={section.id}>
                <h4>{section.title}</h4>
                {section.navItems.map(({ id, label, path }) => (
                  <Nav.Link
                    as={NavLink}
                    key={id}
                    to={`/home/${path}`}
                    className={
                      location.pathname.includes(path) ? 'active-link py-2 px-3 mb-2 text-dark' : 'py-2 px-3 mb-2 text-dark'
                    }
                    onClick={() => setShowSidebar(false)}
                  >
                    {label}
                  </Nav.Link>
                ))}
              </React.Fragment>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Row className="h-100">
        <Col xs={12} md={3} className="sidebar bg-light p-3 d-none d-md-block">
          <div className="vertical-line" /> {/* Vertical line */}
          {dashboardConfig.sections.map((section) => (
            <React.Fragment key={section.id}>
              <h4 className="mb-4">{section.title}</h4>
              <Nav className="flex-column mb-3">
                {section.navItems.map(({ id, label, path }) => (
                  <Nav.Link
                    as={NavLink}
                    key={id}
                    to={`/home/${path}`}
                    className={
                      location.pathname.includes(path) ? 'active-link py-2 px-3 mb-2 text-dark' : 'py-2 px-3 mb-2 text-dark'
                    }
                  >
                    {label}
                  </Nav.Link>
                ))}
              </Nav>
            </React.Fragment>
          ))}
        </Col>

        <Col xs={12} md={9} className="content p-4">
          <Outlet />
        </Col>
      </Row>

      {!location.pathname.startsWith('/home/chat') && <AIChatBox />}
    </Container>
  );
};

export default Dashboard;
