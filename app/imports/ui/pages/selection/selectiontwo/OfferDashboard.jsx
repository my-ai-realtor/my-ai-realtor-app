import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Button, Badge, Dropdown } from 'react-bootstrap';

const OfferDashboard = ({ setOffer, setSelection }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const deadlines = [
    {
      label: 'Offer Expiration Date',
      date: 'February 21, 2025',
      urgency: 'green',
    },
    {
      label: 'Loan Application Deadline',
      date: 'January 07, 2025',
      urgency: 'yellow',
    },
    {
      label: 'Earnest Money Deadline',
      date: 'December 22, 2024',
      urgency: 'red',
    },
    {
      label: 'Inspection Deadline',
      date: 'December 30, 2024',
      urgency: 'yellow',
    },
    {
      label: 'Final Walkthrough Date',
      date: 'February 25, 2025',
      urgency: 'green',
    },
    {
      label: 'Closing Date',
      date: 'March 01, 2025',
      urgency: 'red',
    },
    {
      label: 'Appraisal Deadline',
      date: 'January 15, 2025',
      urgency: 'yellow',
    },
  ];

  const statusOptions = [
    { label: 'Preparation', color: 'secondary' },
    { label: 'Submitted', color: 'primary' },
    { label: 'Rejected', color: 'danger' },
    { label: 'Countered', color: 'warning' },
    { label: 'Accepted', color: 'success' },
  ];

  const handleSelectStatus = (eventKey) => {
    const status = statusOptions.find(option => option.label === eventKey);
    setSelectedStatus(status);
  };

  // Group deadlines by urgency
  const groupedDeadlines = {
    green: [],
    yellow: [],
    red: [],
  };

  deadlines.forEach((deadline) => {
    groupedDeadlines[deadline.urgency].push(deadline);
  });

  return (
    <Container className="my-4">
      <h2 className="text-center">Offer Dashboard</h2>

      {/* Summary of Offer */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4">Summary of Offer</h5>
          <div className="border rounded p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-weight-bold">Buyer Information</p>
                <p>Buyer Name: John Doe</p>
                <p>Contact Information: example@email.com</p>
                <p>Pre-Approval Status: Yes</p>
              </div>
              <div>
                <p className="font-weight-bold">Property Information</p>
                <p>Property Type: Single-family</p>
                <p>Property Condition: Move-in ready</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-weight-bold">Offer Details</p>
                <p>Financing Type: Conventional Loan</p>
                <p>Down Payment Amount: $50,000</p>
                <p>Earnest Money Deposit: $10,000</p>
                <p>Closing Costs Contribution: Buyer/Seller 50/50</p>
                <p>Proposed Closing Date: February 28, 2025</p>
              </div>
              <div>
                <p className="font-weight-bold">Offer Terms</p>
                <p>Expiration Date of Offer: February 21, 2025</p>
                <p>Additional Terms: None</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="primary" className="me-2">
              Edit Document
            </Button>
            <Button variant="secondary">Ask AI</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Offer Status Dropdown */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Offer Status</h5>
          <Dropdown onSelect={handleSelectStatus}>
            <Dropdown.Toggle variant="secondary">
              {selectedStatus ? selectedStatus.label : 'Select Status'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {statusOptions.map((status, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={status.label}
                  active={selectedStatus?.label === status.label}
                >
                  <Badge bg={status.color} className="me-2" />
                  {status.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedStatus && (
            <div className="mt-3 d-inline">
              <Badge bg={selectedStatus.color} className="me-2 h3">
                {selectedStatus.label}
              </Badge>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Timeline Legend */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Timeline Legend</h5>
          <div className="d-flex">
            <div className="me-3">
              <div
                className="square"
                style={{
                  backgroundColor: 'green',
                  width: '20px',
                  height: '20px',
                  display: 'inline-block',
                  border: 'none',
                }}
              />
              <span className="ms-2">Deadline is far</span>
            </div>
            <div className="me-3">
              <div
                className="square"
                style={{
                  backgroundColor: 'yellow',
                  width: '20px',
                  height: '20px',
                  display: 'inline-block',
                  border: 'none',
                }}
              />
              <span className="ms-2">Deadline Approaching</span>
            </div>
            <div className="me-3">
              <div
                className="square"
                style={{
                  backgroundColor: 'red',
                  width: '20px',
                  height: '20px',
                  display: 'inline-block',
                  border: 'none',
                }}
              />
              <span className="ms-2">Deadline is Near</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Timeline of Events and Deadlines */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Timeline of Events and Deadlines</h5>

          {/* Green Deadlines */}
          <h6 className="mt-3">Far Away Deadlines (Green)</h6>
          {groupedDeadlines.green.map((deadline, index) => (
            <p key={index}>
              <Badge bg={deadline.urgency} className="me-2">
                {deadline.urgency === 'green' && '✓'}
              </Badge>
              <span
                style={{
                  backgroundColor: '#d4edda',
                  padding: '0.2rem',
                  borderRadius: '4px',
                }}
              >
                {deadline.label}: {deadline.date}
              </span>
            </p>
          ))}

          {/* Yellow Deadlines */}
          <h6 className="mt-3">Approaching Deadlines (Yellow)</h6>
          {groupedDeadlines.yellow.map((deadline, index) => (
            <p key={index}>
              <Badge bg={deadline.urgency} className="me-2">
                {deadline.urgency === 'yellow' && '⚠'}
              </Badge>
              <span
                style={{
                  backgroundColor: '#fff3cd',
                  padding: '0.2rem',
                  borderRadius: '4px',
                }}
              >
                {deadline.label}: {deadline.date}
              </span>
            </p>
          ))}

          {/* Red Deadlines */}
          <h6 className="mt-3">Near Deadlines (Red)</h6>
          {groupedDeadlines.red.map((deadline, index) => (
            <p key={index}>
              <Badge bg={deadline.urgency} className="me-2">
                {deadline.urgency === 'red' && '!'}
              </Badge>
              <span
                style={{
                  backgroundColor: '#f8d7da',
                  padding: '0.2rem',
                  borderRadius: '4px',
                }}
              >
                {deadline.label}: {deadline.date}
              </span>
            </p>
          ))}
        </Card.Body>
      </Card>

      <Button
        variant="link"
        onClick={() => setOffer(4)}
        className="text-decoration-none"
      >
        Back to Finance
      </Button>

      <Button
        variant="link"
        onClick={() => setSelection(3)}
        className="text-decoration-none"
      >
        Next
      </Button>
    </Container>
  );
};

OfferDashboard.propTypes = {
  setOffer: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default OfferDashboard;
