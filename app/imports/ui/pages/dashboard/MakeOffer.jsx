import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const questionsData = [
  { id: 1, question: 'What is your full name?' },
  { id: 2, question: 'What is your contact information (email/phone)?' },
  { id: 3, question: 'What is the full name of the seller?' },
  { id: 4, question: 'What is the property address?' },
  { id: 5, question: 'What type of property are you offering on (e.g., single-family, condo)?' },
  { id: 6, question: 'What is your offer price?' },
  { id: 7, question: 'What is your earnest money deposit?' },
  { id: 8, question: 'Are you paying with cash or financing the purchase?' },
  { id: 9, question: 'Would you like to include a financing contingency?' },
  { id: 10, question: 'Would you like to add an inspection contingency?' },
  { id: 11, question: 'Would you like to include an appraisal contingency?' },
  { id: 12, question: 'What is your desired closing date?' },
  { id: 13, question: 'When would you like to take possession of the property?' },
  { id: 14, question: 'Do you have any specific requests, such as repairs or concessions?' },
  { id: 15, question: 'Are there any items you would like included with the property (e.g., appliances)?' },
  { id: 16, question: 'Which escrow company would you prefer if the offer is accepted?' },
  { id: 17, question: 'Is all of the information you’ve provided accurate?' }
];

const MakeOfferPage = () => {
  const location = useLocation();
  const offerPrice = location.state?.offerPrice || ''; // Access offerPrice from navigation state

  const [responses, setResponses] = useState({ 6: offerPrice });

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
