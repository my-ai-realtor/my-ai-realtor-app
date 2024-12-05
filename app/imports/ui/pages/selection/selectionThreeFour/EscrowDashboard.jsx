import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Accordion, Table, AccordionBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EscrowDashboard = ({ setEscrow, setSelection }) => (
  <Container className="py-3">
    <h1 className="text-center">Escrow Dashboard</h1>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Expandable Table with Symbols</Accordion.Header>
        <Accordion.Body>
          {/* Symbols Section */}
          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <span className="text-success me-2">✔</span>
              <span>Completed</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="text-primary me-2">⏳</span>
              <span>In Progress</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-danger me-2">⚠</span>
              <span>Action Needed</span>
            </div>
          </div>
          {/* Table Section */}
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Status</th>
              <th>Username</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td><span className="text-success">✔ Completed</span></td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td><span className="text-primary">⏳ In Progress</span></td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td><span className="text-danger">⚠ Action Needed</span></td>
              <td>@twitter</td>
            </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    <Accordion>
      <Accordion.Header>Upcoming Events</Accordion.Header>
      <Accordion.Body>
      <br />
      Offer Submission (Expires in 3 days)
      <br />
      Inspection Scheduling (Schedule by Nov 28)
      <br />
      Escrow Initiated (Starts Nov 30)
      <br />
      Closing Documents Signed (Due Dec 15)
      </Accordion.Body>
    </Accordion>
    <Accordion>
      <Accordion.Header>Issues</Accordion.Header>
      <AccordionBody>
        None
      </AccordionBody>
    </Accordion>
    <br />
    <Button type="button" onClick={() => setEscrow(0)} className="getting-started-link">Back</Button>
    {'                    '}
    <Button type="button" onClick={() => setSelection(4)} className="getting-started-link">Next</Button>
  </Container>
);

EscrowDashboard.propTypes = {
  setEscrow: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default EscrowDashboard;
