// /imports/ui/pages/dashboard/ComparableAnalysis.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ComparableAnalysisPage = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, address: '', showPrice: false, price: null },
  ]);

  const [redirectToOffer, setRedirectToOffer] = useState(false);

  const addAddress = () => {
    const newId = addresses.length + 1;
    setAddresses([...addresses, { id: newId, address: '', showPrice: false, price: null }]);
  };

  const handleAddressChange = (id, value) => {
    setAddresses(addresses.map(address => (address.id === id ? { ...address, address: value } : address)));
  };

  const generateRandomPrice = () => Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

  const handleCalculateComp = (id) => {
    const randomPrice = generateRandomPrice();
    setAddresses(addresses.map(address => (address.id === id ? { ...address, showPrice: true, price: randomPrice } : address)));
  };

  // Set the redirect flag to true when the "Make Offer" button is clicked
  const handleMakeOffer = () => {
    setRedirectToOffer(true);
  };

  // If redirectToOffer is true, navigate to the /make-offer page
  if (redirectToOffer) {
    return <Navigate to="/home/make-offer" replace />;
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
              <button type="button" onClick={() => handleCalculateComp(address.id)}>Calculate Comp</button>
              {address.showPrice && (
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <span>Price: ${address.price.toLocaleString()}</span>
                  <button type="button" onClick={handleMakeOffer} style={{ marginLeft: '10px' }}>Make Offer</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addAddress} style={{ marginTop: '20px' }}>Add New Address</button>
    </div>
  );
};

export default ComparableAnalysisPage;
