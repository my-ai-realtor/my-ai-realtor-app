// /imports/ui/pages/dashboard/_Blank.jsx
import React, { useState } from 'react';

// This component displays the details of the selected company in a single line
const SelectedCompanyPage = ({ company, goBack }) => (
  <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
    <h2>Company Details</h2>
    <p>
      <strong>Name:</strong> {company.name}, 
      <strong> Description:</strong> {company.description}, 
      <strong> Email:</strong> {company.email}, 
      <strong> Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
    </p>

    {/* Back button to go back to the selection page */}
    <button
      onClick={goBack}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      Back
    </button>
  </div>
);

const OfferAcceptedPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // List of companies with their details
  const companies = [
    {
      name: "First American Title - Aiea",
      description: "First American Title – First American Title – First American Title",
      email: "firstamericantitle@gmail.com",
      website: "https://local.firstam.com/hi"
    },
    {
      name: "Fidelity National Title & Escrow",
      description: "FNT | Hawaii - Home",
      email: "fidelitynationaltitle@gmail.com",
      website: "https://www.fidelityhawaii.com/"
    },
    {
      name: "Premier Title & Escrow",
      description: "Title Company - Honolulu, Kapolei, Kaneohe HI | Premier Title & Escrow",
      email: "premiertitle@gmail.com",
      website: "https://premiertitlehawaii.com/"
    },
    {
      name: "Old Republic Title",
      description: "Honolulu | Old Republic Title",
      email: "oldrepublictitle@gmail.com",
      website: "https://www.oldrepublictitle.com/hawaii/honolulu/"
    }
  ];

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleNext = () => {
    if (selectedCompany) {
      setShowDetails(true);
    }
  };

  const handleBack = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {!showDetails ? (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
          <h2>Congrats on Your Acceptance!</h2>
          <p>
            Next, you need to select an escrow company and email them with your offer form you filled out in the previous step.
          </p>

          {/* Search bar */}
          <input 
            type="text" 
            placeholder="Search for an escrow company..." 
            style={{
              padding: "8px",
              marginBottom: "40px",
              width: "80%",
              display: "block",
              margin: "0 auto"
            }}
          />

          {/* Company buttons in 2x2 grid */}
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              justifyItems: "center",
              marginBottom: "30px"
            }}
          >
            {companies.map((company, index) => (
              <button
                key={index}
                onClick={() => handleCompanySelect(company)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: selectedCompany === company ? "#ffeeba" : "#f0f0f0",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  width: "180px",
                  textAlign: "center",
                  transition: "background-color 0.3s",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  ":hover": {
                    backgroundColor: "#d4e6f1"
                  }
                }}
              >
                {company.name}
              </button>
            ))}
          </div>

          {/* Display selected company details */}
          {selectedCompany && (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <h3>Selected Company</h3>
              <p><strong>Name:</strong> {selectedCompany.name}</p>
              <p><strong>Description:</strong> {selectedCompany.description}</p>
              <p><strong>Email:</strong> {selectedCompany.email}</p>
              <p><strong>Website:</strong> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer">{selectedCompany.website}</a></p>
            </div>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={!selectedCompany}
            style={{
              padding: "10px 20px",
              backgroundColor: selectedCompany ? "#4CAF50" : "#ccc",
              color: "white",
              border: "none",
              cursor: selectedCompany ? "pointer" : "not-allowed",
              display: "block",
              margin: "0 auto"
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <SelectedCompanyPage company={selectedCompany} goBack={handleBack} />
      )}
    </div>
  );
};

export default OfferAcceptedPage;
