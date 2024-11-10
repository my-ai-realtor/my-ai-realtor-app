// /imports/ui/pages/dashboard/MakeOfferPage.jsx
import React, { useState } from 'react';

// Sample data for questions
const questionsData = [
  { id: 1, question: 'What is your offer price?' },
  { id: 2, question: 'What is your preferred closing date?' },
  { id: 3, question: 'Do you have any contingencies (e.g., inspection, financing)?' },
];

const MakeOfferPage = () => {
  // State to hold user responses
  const [responses, setResponses] = useState({});

  // Handle response change
  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // Handle Generate Offer button click
  const handleGenerateOffer = () => {
    // You can add any processing or API call here
  };

  return (
    <div>
      <h2>Make Offer</h2>
      <div>
        {questionsData.map((q) => (
          <div key={q.id} style={{ marginBottom: '15px' }}>
            <label>{q.question}</label>
            <input
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
