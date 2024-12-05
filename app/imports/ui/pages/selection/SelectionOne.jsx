/* eslint-disable react/prop-types */
/* eslint-disable no-console */
// /imports/ui/pages/dashboard/Interest.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  Spinner,
} from 'react-bootstrap';
import {
  FaHome,
  FaBed,
  FaBath,
  FaCar,
  FaRulerCombined,
} from 'react-icons/fa';
import ChatModule from '../../components/ChatModule';

const SelectionOne = ({ setSelection }) => {
  const navigate = useNavigate();
  const [homes, setHomes] = useState([
    {
      id: 1,
      address: '1234 Kapiolani Blvd, Honolulu, HI 96814',
      matchLevel: 'good',
      characteristics: ['has right size', 'has a yard', 'old'],
      daysOnMarket: 60,
      listing: '$6,000,000',
      status: 'unclaimed',
      showCompForm: false,
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
    {
      id: 2,
      address: '5678 Ala Moana Blvd, Honolulu, HI 96815',
      matchLevel: 'average',
      characteristics: ['needs renovation', 'good location'],
      daysOnMarket: 45,
      listing: '$4,000,000',
      status: 'unclaimed',
      showCompForm: false,
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

  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (homeId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [homeId]: !prev[homeId],
    }));
  };

  const addHome = () => {
    const newHome = {
      id: homes.length + 1,
      address: `Address ${homes.length + 1}`,
      matchLevel: 'unknown',
      characteristics: [],
      daysOnMarket: 0,
      listing: '$0',
      status: 'unclaimed',
      showCompForm: false,
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
    };
    setHomes([...homes, newHome]);
  };

  const handleSubmit = (home) => {
    setSelection((prev) => prev + 1);
    console.log('Submitting home:', home);
    navigate('/selection'); // Navigate to the desired page
  };

  const makeOffer = (home) => {
    console.log(`Make offer button clicked for home ID: ${home.id}`);
    handleSubmit(home);
  };

  const makeComp = (home) => {
    console.log(`Comp button clicked for home ID: ${home.id}`);
    setHomes(homes.map(h => (h.id === home.id ? { ...h, showCompForm: !h.showCompForm } : h)));
  };

  const handleFeatureChange = (homeId, field, value) => {
    setHomes(homes.map(home => {
      if (home.id === homeId) {
        return {
          ...home,
          features: {
            ...home.features,
            [field]: field.includes('_Code') ? parseInt(value, 10) : parseFloat(value),
          },
        };
      }
      return home;
    }));
  };

  const handleCalculateComp = (homeId) => {
    const home = homes.find(h => h.id === homeId);
    Meteor.call('calculateComparable', home.features, (error, result) => {
      if (error) {
        console.error(error);
        alert('Failed to calculate comparable price');
      } else if (result && result.status === 'in-progress') {
        setHomes(homes.map(h => (h.id === homeId ? { ...h, predictedPrice: result, eventId: result.eventId } : h)));
      } else if (result && result.status === 'complete') {
        setHomes(homes.map(h => (h.id === homeId ? { ...h, predictedPrice: result.predictedPrice, eventId: null } : h)));
      } else {
        console.error('Unexpected response format', result);
        alert('Unexpected response format from the server');
      }
    });
  };

  useEffect(() => {
    const pollPredictions = () => {
      homes.forEach((home) => {
        if (home.eventId) {
          Meteor.call('checkPredictionStatus', home.eventId, (error, result) => {
            if (error) {
              console.error(error);
            } else if (result.status === 'complete') {
              setHomes(homes.map(h => (h.id === home.id ? { ...h, predictedPrice: result.predictedPrice, eventId: null } : h)));
            }
          });
        }
      });
    };

    const intervalId = setInterval(pollPredictions, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, [homes]);

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

  const renderPredictedPrice = (predictedPrice, home) => {
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
              onClick={() => makeOffer(home)}
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

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2>Homes of Interest</h2>
        <button
          type="button"
          onClick={addHome}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28A745',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          + Add Home
        </button>
      </div>

      {/* List of Homes */}
      <div>
        {homes.map((home) => (
          <div
            key={home.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <strong style={{ fontSize: '18px' }}>{home.address}</strong>
                  <button
                    type="button"
                    style={{
                      marginLeft: '10px',
                      fontSize: '18px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleDropdown(home.id)}
                  >
                    {dropdownOpen[home.id] ? '−' : '+'}
                  </button>
                </div>
                {dropdownOpen[home.id] && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Match Level:</strong> {home.matchLevel}
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Characteristics:</strong>
                      <ul style={{ marginLeft: '20px' }}>
                        {home.characteristics.map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Days on Market:</strong> {home.daysOnMarket}
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Listing:</strong> {home.listing}
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Status:</strong> {home.status}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => makeOffer(home)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Make Offer
                </button>
                <button
                  type="button"
                  onClick={() => makeComp(home)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Comp Prices
                </button>
              </div>
            </div>
            {home.showCompForm && (
              <div style={{ marginTop: '10px' }}>
                <Form>
                  <Row>
                    {Object.keys(home.features).map((featureKey, index) => {
                      const feature = featureMetadata[featureKey];
                      return (
                        <Col md={6} key={index} className="mb-3">
                          <Form.Group controlId={`feature-${index}`}>
                            <Form.Label>
                              {feature.icon && (
                                <span className="me-2" style={{ verticalAlign: 'middle' }}>
                                  {feature.icon}
                                </span>
                              )}
                              {feature.label}
                            </Form.Label>
                            {feature.type === 'select' ? (
                              <Form.Select
                                value={home.features[featureKey]}
                                onChange={(e) => handleFeatureChange(
                                  home.id,
                                  featureKey,
                                  e.target.value,
                                )}
                              >
                                {feature.options.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </Form.Select>
                            ) : (
                              <Form.Control
                                type={feature.type}
                                placeholder={feature.placeholder}
                                value={home.features[featureKey]}
                                onChange={(e) => handleFeatureChange(
                                  home.id,
                                  featureKey,
                                  e.target.value,
                                )}
                              />
                            )}
                          </Form.Group>
                        </Col>
                      );
                    })}
                  </Row>
                  <div className="text-end">
                    <Button
                      variant="primary"
                      onClick={() => handleCalculateComp(home.id)}
                    >
                      Calculate Estimate
                    </Button>
                  </div>
                </Form>
                {renderPredictedPrice(home.predictedPrice, home)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Module */}
      <div style={{ flex: 1, borderLeft: '1px solid #ddd' }}>
        <ChatModule />
      </div>
    </div>
  );
};

export default SelectionOne;
