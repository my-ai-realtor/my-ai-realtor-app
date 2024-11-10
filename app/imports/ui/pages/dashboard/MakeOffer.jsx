import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const questionsData = [
  { id: 1, question: 'What is your offer price?' },
  { id: 2, question: 'What is your preferred closing date?' },
  { id: 3, question: 'Do you have any contingencies (e.g., inspection, financing)?' },
];

const MakeOfferPage = () => {
  const location = useLocation();
  const offerPrice = location.state?.offerPrice || ''; // Access offerPrice from navigation state

  const [responses, setResponses] = useState({ 1: offerPrice });

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleGenerateOffer = () => {
    // You can add any processing or API call here
    console.log('Offer data:', responses); // Example log
  };

  return (
    <div>
      <h2>Make Offer</h2>
      <div>
        {questionsData.map((q) => (
          <div key={q.id} style={{ marginBottom: '15px' }}>
            <label htmlFor={`question-${q.id}`}>{q.question}</label> {/* Add htmlFor attribute */}
            <input
              id={`question-${q.id}`} // Add id attribute to match the label's htmlFor
              type="text"
              placeholder="Your answer"
              value={responses[q.id] || ''}
              onChange={(e) => handleResponseChange(q.id, e.target.value)}
              style={{ marginLeft: '10px', width: '300px' }}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={handleGenerateOffer} style={{ marginTop: '20px' }}>
        Generate Offer
      </button>
    </div>
  );
};

export default MakeOfferPage;
