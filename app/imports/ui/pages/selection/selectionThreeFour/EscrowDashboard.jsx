import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Accordion, Table, AccordionBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EscrowDashboard = ({ setEscrow, setSelection }) => (
  <Container className="py-3">
    <h1 className="text-center">Escrow Dashboard</h1>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Your Escrow Real Estate Timeline</Accordion.Header>
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
                <th>Milestone</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Selection Phase</td>
                <td><span className="text-success">✔ Completed</span></td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Offer Preparation</td>
                <td><span className="text-success">✔ Completed</span></td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Offer Submission</td>
                <td><span className="text-primary me-2">⏳ In Progress</span></td>
                <td>November 20</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Inspection Scheduling</td>
                <td><span className="text-danger me-2">⚠ Action Needed</span></td>
                <td>Schedule by November 28</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Escrow Initiated</td>
                <td><span className="text-primary me-2">⏳ In Progress</span></td>
                <td>Starts November 30</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Closing Documents Signed</td>
                <td><span className="text-primary me-2">⏳ In Progress</span></td>
                <td>Due December 15</td>
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
