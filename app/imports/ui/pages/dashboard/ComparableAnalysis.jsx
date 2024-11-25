import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Spinner,
  Accordion,
} from 'react-bootstrap';
import {
  FaHome,
  FaBed,
  FaBath,
  FaCar,
  FaRulerCombined,
} from 'react-icons/fa';

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
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, address: value } : address
      )
    );
  };

  const handleToggleFeaturesForm = (id) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id
          ? { ...address, showForm: !address.showForm }
          : address
      )
    );
  };

  const handleFeatureChange = (id, field, value) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id
          ? {
              ...address,
              features: {
                ...address.features,
                [field]: field.includes('_Code')
                  ? parseInt(value, 10)
                  : parseFloat(value),
              },
            }
          : address
      )
    );
  };

  const handleCalculateComp = (id) => {
    const address = addresses.find((addr) => addr.id === id);

    Meteor.call('calculateComparable', address.features, (error, result) => {
      if (error) {
        console.error(error);
        alert('Failed to calculate comparable price');
      } else if (result && result.status === 'in-progress') {
        setAddresses(
          addresses.map((addr) =>
            addr.id === id
              ? {
                  ...addr,
                  predictedPrice: result,
                  eventId: result.eventId,
                }
              : addr
          )
        );
      } else if (result && result.status === 'complete') {
        setAddresses(
          addresses.map((addr) =>
            addr.id === id
              ? {
                  ...addr,
                  predictedPrice: result.predictedPrice,
                  eventId: null,
                }
              : addr
          )
        );
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
          Meteor.call(
            'checkPredictionStatus',
            address.eventId,
            (error, result) => {
              if (error) {
                console.error(error);
              } else if (result.status === 'complete') {
                setAddresses(
                  addresses.map((addr) =>
                    addr.id === address.id
                      ? {
                          ...addr,
                          predictedPrice: result.predictedPrice,
                          eventId: null,
                        }
                      : addr
                  )
                );
              }
            }
          );
        }
      });
    };

    const intervalId = setInterval(pollPredictions, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, [addresses]);

  const handleMakeOffer = (predictedPrice) => {
    setRedirectToOffer({
      pathname: '/home/make-offer',
      state: { offerPrice: predictedPrice },
    });
  };

  const renderPredictedPrice = (predictedPrice) => {
    if (predictedPrice != null) {
      if (typeof predictedPrice === 'object' && predictedPrice.status === 'in-progress') {
        return (
          <div className="mt-3 text-center">
            <Spinner animation="border" />
            <p>Calculating estimate...</p>
          </div>
        );
      }
      return (
        <Card className="mt-3">
          <Card.Body className="text-center">
            <Card.Title>Estimated Sales Price</Card.Title>
            <h2>${predictedPrice.toLocaleString()}</h2>
            <Button
              variant="success"
              onClick={() => handleMakeOffer(predictedPrice)}
              className="mt-3"
            >
              Make Offer
            </Button>
          </Card.Body>
        </Card>
      );
    }
    return null;
  };

  const featureMetadata = {
    Site_Area_sqft: {
      label: 'Site Area (sqft)',
      icon: <FaRulerCombined />,
      type: 'number',
      placeholder: 'Enter site area in sqft',
    },
    Actual_Age_Years: {
      label: 'Actual Age (Years)',
      icon: <FaHome />,
      type: 'number',
      placeholder: 'Enter age of the property',
    },
    Total_Rooms: {
      label: 'Total Rooms',
      icon: <FaHome />,
      type: 'number',
      placeholder: 'Enter total number of rooms',
    },
    Bedrooms: {
      label: 'Bedrooms',
      icon: <FaBed />,
      type: 'number',
      placeholder: 'Enter number of bedrooms',
    },
    Bathrooms: {
      label: 'Bathrooms',
      icon: <FaBath />,
      type: 'number',
      placeholder: 'Enter number of bathrooms',
    },
    Gross_Living_Area_sqft: {
      label: 'Gross Living Area (sqft)',
      icon: <FaRulerCombined />,
      type: 'number',
      placeholder: 'Enter gross living area in sqft',
    },
    Design_Style_Code: {
      label: 'Design Style',
      type: 'select',
      options: [
        { value: 1, label: 'Modern' },
        { value: 2, label: 'Traditional' },
        { value: 3, label: 'Contemporary' },
      ],
    },
    Condition_Code: {
      label: 'Condition',
      type: 'select',
      options: [
        { value: 1, label: 'Poor' },
        { value: 2, label: 'Fair' },
        { value: 3, label: 'Good' },
        { value: 4, label: 'Excellent' },
      ],
    },
    Energy_Efficient_Code: {
      label: 'Energy Efficiency',
      type: 'select',
      options: [
        { value: 1, label: 'Low' },
        { value: 2, label: 'Medium' },
        { value: 3, label: 'High' },
      ],
    },
    Garage_Carport_Code: {
      label: 'Garage/Carport',
      icon: <FaCar />,
      type: 'select',
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Carport' },
        { value: 3, label: 'Garage' },
      ],
    },
  };

  if (redirectToOffer) {
    return (
      <Navigate
        to={redirectToOffer.pathname}
        state={redirectToOffer.state}
        replace
      />
    );
  }

  return (
    <Container>
      <h2 className="my-4 text-center">MyAIRealtor Valuation Assistant
      </h2>
      <ListGroup>
        {addresses.map((address) => (
          <ListGroup.Item key={address.id} className="mb-3">
            <Form>
              <Row className="align-items-center">
                <Col md={8}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address.address}
                      onChange={(e) =>
                        handleAddressChange(address.id, e.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md={4} className="text-end">
                  <Button
                    variant="info"
                    onClick={() => handleToggleFeaturesForm(address.id)}
                  >
                    {address.showForm ? 'Hide Details' : 'Show Details'}
                  </Button>
                </Col>
              </Row>
              {address.showForm && (
                <Accordion defaultActiveKey="0" className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Property Features</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        {Object.keys(address.features).map(
                          (featureKey, index) => {
                            const feature = featureMetadata[featureKey];
                            return (
                              <Col md={6} key={index} className="mb-3">
                                <Form.Group controlId={`feature-${index}`}>
                                  <Form.Label>
                                    {feature.icon && (
                                      <span
                                        className="me-2"
                                        style={{ verticalAlign: 'middle' }}
                                      >
                                        {feature.icon}
                                      </span>
                                    )}
                                    {feature.label}
                                  </Form.Label>
                                  {feature.type === 'select' ? (
                                    <Form.Select
                                      value={address.features[featureKey]}
                                      onChange={(e) =>
                                        handleFeatureChange(
                                          address.id,
                                          featureKey,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {feature.options.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  ) : (
                                    <Form.Control
                                      type={feature.type}
                                      placeholder={feature.placeholder}
                                      value={address.features[featureKey]}
                                      onChange={(e) =>
                                        handleFeatureChange(
                                          address.id,
                                          featureKey,
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </Form.Group>
                              </Col>
                            );
                          }
                        )}
                      </Row>
                      <div className="text-end">
                        <Button
                          variant="primary"
                          onClick={() => handleCalculateComp(address.id)}
                        >
                          Calculate Estimate
                        </Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
              {renderPredictedPrice(address.predictedPrice)}
            </Form>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={addAddress}
          className="mt-4"
        >
          Add New Address
        </Button>
      </div>
    </Container>
  );
};

export default ComparableAnalysisPage;
