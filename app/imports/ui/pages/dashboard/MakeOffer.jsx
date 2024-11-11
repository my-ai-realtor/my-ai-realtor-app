import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Mustache from 'mustache';
import markdownIt from 'markdown-it';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const markdownTemplate = `
# Real Estate Offer

**Buyer Name:** {{ fullName }}
**Contact Information:** {{ contactInfo }}
**Seller Name:** {{ sellerName }}
**Property Address:** {{ propertyAddress }}
**Property Type:** {{ propertyType }}
**Offer Price:** {{ offerPrice }}
**Earnest Money Deposit:** {{ earnestMoney }}
**Payment Method:** {{ paymentMethod }}
**Contingencies:**
- Financing Contingency: {{ financingContingency }}
- Inspection Contingency: {{ inspectionContingency }}
- Appraisal Contingency: {{ appraisalContingency }}
**Desired Closing Date:** {{ closingDate }}
**Possession Date:** {{ possessionDate }}
**Additional Terms:**
- **Requests:** {{ requests }}
- **Included Items:** {{ includedItems }}
**Escrow Company:** {{ escrowCompany }}
`;

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
  { id: 17, question: 'Is all of the information you’ve provided accurate?' },
];

const MakeOfferPage = () => {
  const location = useLocation();
  const [responses, setResponses] = useState({ 6: location?.state?.offerPrice || '' });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [buttonLabel, setButtonLabel] = useState('Generate Offer');

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleGenerateOffer = async () => {
    const filledMarkdown = Mustache.render(markdownTemplate, {
      fullName: responses[1],
      contactInfo: responses[2],
      sellerName: responses[3],
      propertyAddress: responses[4],
      propertyType: responses[5],
      offerPrice: responses[6],
      earnestMoney: responses[7],
      paymentMethod: responses[8],
      financingContingency: responses[9],
      inspectionContingency: responses[10],
      appraisalContingency: responses[11],
      closingDate: responses[12],
      possessionDate: responses[13],
      requests: responses[14],
      includedItems: responses[15],
      escrowCompany: responses[16],
    });

    const md = new markdownIt();
    const textContent = md.render(filledMarkdown).replace(/<\/?[^>]+(>|$)/g, '');

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const fontSize = 12;
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let yPosition = 750;
    page.drawText('Real Estate Offer', {
      x: 50,
      y: yPosition,
      size: 20,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    const sections = [
      { label: 'Buyer Name:', key: 1 },
      { label: 'Contact Information:', key: 2 },
      { label: 'Seller Name:', key: 3 },
      { label: 'Property Address:', key: 4 },
      { label: 'Property Type:', key: 5 },
      { label: 'Offer Price:', key: 6 },
      { label: 'Earnest Money Deposit:', key: 7 },
      { label: 'Payment Method:', key: 8 },
      { label: 'Contingencies:', key: null },
      { label: '- Financing Contingency:', key: 9 },
      { label: '- Inspection Contingency:', key: 10 },
      { label: '- Appraisal Contingency:', key: 11 },
      { label: 'Desired Closing Date:', key: 12 },
      { label: 'Possession Date:', key: 13 },
      { label: 'Additional Terms:', key: null },
      { label: '- Requests:', key: 14 },
      { label: '- Included Items:', key: 15 },
      { label: 'Escrow Company:', key: 16 },
    ];

    sections.forEach((section) => {
      const value = section.key ? responses[section.key] : '';
      page.drawText(section.label, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      page.drawText(value, {
        x: 200,
        y: yPosition,
        size: fontSize,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });

    // Add a signature section at the bottom
    yPosition -= 40;
    page.drawText('Signature:', {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: 120, y: yPosition - 2 },
      end: { x: 400, y: yPosition - 2 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    page.drawText('Date:', {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: 120, y: yPosition - 2 },
      end: { x: 250, y: yPosition - 2 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    setButtonLabel('Regenerate Offer');
  };

  return (
    <div>
      <h2>Make Offer</h2>
      <div>
        {questionsData.map((q) => (
          <div key={q.id} style={{ marginBottom: '15px' }}>
            <label htmlFor={`question-${q.id}`}>{q.question}</label>
            <input
              id={`question-${q.id}`}
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
        {buttonLabel}
      </button>

      {pdfUrl && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
          <iframe
            src={pdfUrl}
            title="Generated Offer PDF"
            width="100%"
            height="500px"
            style={{ border: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default MakeOfferPage;
