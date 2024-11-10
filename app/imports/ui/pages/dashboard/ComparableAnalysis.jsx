import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const ComparableAnalysisPage = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, address: '', showForm: false, features: {}, predictedPrice: null, eventId: null },
  ]);
  const [redirectToOffer, setRedirectToOffer] = useState(false);

  const addAddress = () => {
    const newId = addresses.length + 1;
    setAddresses([...addresses, { id: newId, address: '', showForm: false, features: {}, predictedPrice: null, eventId: null }]);
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
        // Prediction in progress, save the eventId for polling
        setAddresses(addresses.map(addr => (
          addr.id === id ? { ...addr, predictedPrice: result, eventId: result.eventId } : addr
        )));
      } else if (result && result.status === 'complete') {
        // Prediction is complete
        setAddresses(addresses.map(addr => (
          addr.id === id ? { ...addr, predictedPrice: result.predictedPrice, eventId: null } : addr
        )));
      } else {
        console.error("Unexpected response format", result);
        alert('Unexpected response format from the server');
      }
    });
  };


  useEffect(() => {
    // Polling function to check for prediction completion
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

    // Set up a polling interval
    const intervalId = setInterval(pollPredictions, 5000); // Poll every 5 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [addresses]);

  const handleMakeOffer = (predictedPrice) => {
    setRedirectToOffer({ pathname: '/home/make-offer', state: { offerPrice: predictedPrice } });
  };

  const renderPredictedPrice = (predictedPrice) => {
    if (predictedPrice != null) {
      if (typeof predictedPrice === 'object' && predictedPrice.status === 'in-progress') {
        return <span>{predictedPrice.message}</span>;
      }
      return (
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <span>Predicted Price: ${predictedPrice}</span>
          <button type="button" onClick={() => handleMakeOffer(predictedPrice)} style={{ marginLeft: '10px' }}>
            Make Offer
          </button>
        </div>
      );
    }
    return null;
  };

  if (redirectToOffer) {
    return <Navigate to={redirectToOffer.pathname} state={redirectToOffer.state} replace />;
  }

  return (
    <div>
      <h2>Comparable Analysis</h2>
      <ul>
        {addresses.map(address => (
          <li key={address.id} style={{ marginBottom: '10px' }}>
            <div>
              <input
                type="text"
                placeholder="Enter address"
                value={address.address}
                onChange={(e) => handleAddressChange(address.id, e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <button type="button" onClick={() => handleToggleFeaturesForm(address.id)}>
                {address.showForm ? 'Hide Features' : 'Add Features'}
              </button>
              {address.showForm && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="number"
                    placeholder="Site Area (sqft)"
                    onChange={(e) => handleFeatureChange(address.id, 'Site_Area_sqft', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Actual Age (Years)"
                    onChange={(e) => handleFeatureChange(address.id, 'Actual_Age_Years', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Total Rooms"
                    onChange={(e) => handleFeatureChange(address.id, 'Total_Rooms', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Bedrooms"
                    onChange={(e) => handleFeatureChange(address.id, 'Bedrooms', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Bathrooms"
                    onChange={(e) => handleFeatureChange(address.id, 'Bathrooms', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Gross Living Area (sqft)"
                    onChange={(e) => handleFeatureChange(address.id, 'Gross_Living_Area_sqft', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Design Style Code"
                    onChange={(e) => handleFeatureChange(address.id, 'Design_Style_Code', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Condition Code"
                    onChange={(e) => handleFeatureChange(address.id, 'Condition_Code', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Energy Efficient Code"
                    onChange={(e) => handleFeatureChange(address.id, 'Energy_Efficient_Code', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Garage/Carport Code"
                    onChange={(e) => handleFeatureChange(address.id, 'Garage_Carport_Code', e.target.value)}
                  />
                  <button type="button" onClick={() => handleCalculateComp(address.id)} style={{ marginTop: '10px' }}>
                    Calculate Comp
                  </button>
                </div>
              )}
              {renderPredictedPrice(address.predictedPrice)}
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addAddress} style={{ marginTop: '20px' }}>Add New Address</button>
    </div>
  );
};

export default ComparableAnalysisPage;
