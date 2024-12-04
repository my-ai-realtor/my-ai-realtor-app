/* eslint-disable react/prop-types */
/* eslint-disable no-console */
// /imports/ui/pages/dashboard/Interest.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    },
    {
      id: 2,
      address: '5678 Ala Moana Blvd, Honolulu, HI 96815',
      matchLevel: 'average',
      characteristics: ['needs renovation', 'good location'],
      daysOnMarket: 45,
      listing: '$4,000,000',
      status: 'unclaimed',
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Homes of Interest</h2>
      <div>
        {homes.map((home) => (
          <div
            key={home.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderRadius: '5px',
            }}
          >
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
                alignSelf: 'flex-start',
              }}
            >
              Make Offer
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHome}
          style={{
            marginTop: '10px',
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
    </div>
  );
};

export default SelectionOne;
