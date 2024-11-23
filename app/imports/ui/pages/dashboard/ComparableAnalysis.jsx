/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Button, Form, InputGroup, Container, Row, Col, ListGroup, Card, Spinner } from 'react-bootstrap';

const ComparableAnalysisPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: '',
      showForm: false,
      features: {
        Site_Area_sqft: 1000,
        Actual_Age_Years: 10,
        Total_Rooms: 5,
        Bedrooms: 3,
        Bathrooms: 2,
        Gross_Living_Area_sqft: 1500,
        Design_Style_Code: 1,
        Condition_Code: 3,
        Energy_Efficient_Code: 2,
        Garage_Carport_Code: 1,
      },
      predictedPrice: null,
      eventId: null,
    },
  ]);
  const [redirectToOffer, setRedirectToOffer] = useState(false);

  const addAddress = () => {
    const newId = addresses.length + 1;
    setAddresses([
      ...addresses,
      {
        id: newId,
        address: '',
        showForm: false,
        features: {
          Site_Area_sqft: 1000,
          Actual_Age_Years: 10,
          Total_Rooms: 5,
          Bedrooms: 3,
          Bathrooms: 2,
          Gross_Living_Area_sqft: 1500,
          Design_Style_Code: 1,
          Condition_Code: 3,
          Energy_Efficient_Code: 2,
          Garage_Carport_Code: 1,
        },
        predictedPrice: null,
        eventId: null,
      },
    ]);
  };

  const handleAddressChange = (id, value) => {
    setAddresses(addresses.map(address => (address.id === id ? { ...address, address: value } : address)));
  };

  const handleToggleFeaturesForm = (id) => {
    setAddresses(addresses.map(address => (address.id === id ? { ...address, showForm: !address.showForm } : address)));
  };

  const handleFeatureChange = (id, field, value) => {
    setAddresses(addresses.map(address => (
      address.id === id ? { ...address, features: { ...address.features, [field]: parseFloat(value) } } : address
    )));
  };

  const handleCalculateComp = (id) => {
    const address = addresses.find(addr => addr.id === id);

    Meteor.call('calculateComparable', address.features, (error, result) => {
      if (error) {
        console.error(error);
        alert('Failed to calculate comparable price');
      } else if (result && result.status === 'in-progress') {
        setAddresses(addresses.map(addr => (
          addr.id === id ? { ...addr, predictedPrice: result, eventId: result.eventId } : addr
        )));
      } else if (result && result.status === 'complete') {
        setAddresses(addresses.map(addr => (
          addr.id === id ? { ...addr, predictedPrice: result.predictedPrice, eventId: null } : addr
        )));
      } else {
        console.error('Unexpected response format', result);
        alert('Unexpected response format from the server');
      }
    });
  };

  useEffect(() => {
    const pollPredictions = () => {
      addresses.forEach((address) => {
        if (address.eventId) {
          Meteor.call('checkPredictionStatus', address.eventId, (error, result) => {
            if (error) {
              console.error(error);
            } else if (result.status === 'complete') {
              setAddresses(addresses.map(addr => (
                addr.id === address.id ? { ...addr, predictedPrice: result.predictedPrice, eventId: null } : addr
              )));
            }
          });
        }
      });
    };

    const intervalId = setInterval(pollPredictions, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, [addresses]);

  const handleMakeOffer = (predictedPrice) => {
    setRedirectToOffer({ pathname: '/home/make-offer', state: { offerPrice: predictedPrice } });
  };

  const renderPredictedPrice = (predictedPrice) => {
    if (predictedPrice != null) {
      if (typeof predictedPrice === 'object' && predictedPrice.status === 'in-progress') {
        return <Spinner animation="border" size="sm" />;
      }
      return (
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <span>Predicted Price: ${predictedPrice}</span>
          <Button variant="success" size="sm" onClick={() => handleMakeOffer(predictedPrice)} style={{ marginLeft: '10px' }}>
            Make Offer
          </Button>
        </div>
      );
    }
    return null;
  };

  if (redirectToOffer) {
    return <Navigate to={redirectToOffer.pathname} state={redirectToOffer.state} replace />;
  }

  return (
    <Container>
      <h2 className="my-4">Comparable Analysis</h2>
      <ListGroup>
        {addresses.map(address => (
          <ListGroup.Item key={address.id} className="mb-3">
            <Form>
              <Row>
                <Col md={8}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address.address}
                      onChange={(e) => handleAddressChange(address.id, e.target.value)}
                    />
                    <Button variant="secondary" onClick={() => handleToggleFeaturesForm(address.id)}>
                      {address.showForm ? 'Hide Features' : 'Add Features'}
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
              {address.showForm && (
                <Card className="mt-3 p-3">
                  <Row>
                    {Object.keys(address.features).map((feature, index) => (
                      <Col md={4} key={index}>
                        <Form.Group controlId={`feature-${index}`}>
                          <Form.Control
                            type="number"
                            placeholder={feature.replace(/_/g, ' ')}
                            value={address.features[feature]}
                            onChange={(e) => handleFeatureChange(address.id, feature, e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                  <Button variant="primary" className="mt-3" onClick={() => handleCalculateComp(address.id)}>
                    Calculate Comp
                  </Button>
                </Card>
              )}
              {renderPredictedPrice(address.predictedPrice)}
            </Form>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="outline-primary" onClick={addAddress} className="mt-4">Add New Address</Button>
    </Container>
  );
};

export default ComparableAnalysisPage;
