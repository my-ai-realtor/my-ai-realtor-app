import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Container, Form, Button, Card } from 'react-bootstrap';

const questionsData = [
  { id: 1, question: 'What is your full name?', default: 'John Doe' },
  { id: 2, question: 'What is your contact information (email/phone)?', default: 'john@example.com' },
  { id: 3, question: 'What is the full name of the seller?', default: 'Jane Smith' },
  { id: 4, question: 'What is the property address?', default: '123 Main St, City, Country' },
  { id: 5, question: 'What type of property are you offering on (e.g., single-family, condo)?', default: 'Single-Family' },
  { id: 6, question: 'What is your offer price?', default: '250000' },
  { id: 7, question: 'What is your earnest money deposit?', default: '5000' },
  { id: 8, question: 'Are you paying with cash or financing the purchase?', default: 'Financing' },
  { id: 9, question: 'Would you like to include a financing contingency?', default: 'Yes' },
  { id: 10, question: 'Would you like to add an inspection contingency?', default: 'Yes' },
  { id: 11, question: 'Would you like to include an appraisal contingency?', default: 'Yes' },
  { id: 12, question: 'What is your desired closing date?', default: '2023-12-31' },
  { id: 13, question: 'When would you like to take possession of the property?', default: '2024-01-15' },
  { id: 14, question: 'Do you have any specific requests, such as repairs or concessions?', default: 'None' },
  { id: 15, question: 'Are there any items you would like included with the property (e.g., appliances)?', default: 'Appliances' },
  { id: 16, question: 'Which escrow company would you prefer if the offer is accepted?', default: 'ABC Escrow' },
  { id: 17, question: 'Is all of the information you’ve provided accurate?', default: 'Yes' },
];

const MakeOfferPage = () => {
  const location = useLocation();
  const [responses, setResponses] = useState(() => {
    const initialResponses = {};
    questionsData.forEach((q) => {
      initialResponses[q.id] = q.id === 6 ? location?.state?.offerPrice || q.default : q.default;
    });
    return initialResponses;
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [buttonLabel, setButtonLabel] = useState('Generate Offer');

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleGenerateOffer = async () => {

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
      const value = section.key ? String(responses[section.key] || '') : '';
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
    <Container className="my-4">
      <h2>Make Offer</h2>
      <Card className="p-4 mt-4">
        <Form>
          {questionsData.map((q) => (
            <Form.Group key={q.id} className="mb-3">
              <Form.Label>{q.question}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your answer"
                value={responses[q.id] || ''}
                onChange={(e) => handleResponseChange(q.id, e.target.value)}
              />
            </Form.Group>
          ))}
        </Form>
        <Button variant="primary" onClick={handleGenerateOffer} className="mt-3">
          {buttonLabel}
        </Button>
      </Card>

      {pdfUrl && (
        <Card className="mt-4 p-3">
          <iframe
            src={pdfUrl}
            title="Generated Offer PDF"
            width="100%"
            height="500px"
            style={{ border: 'none' }}
          />
        </Card>
      )}
    </Container>
  );
};

export default MakeOfferPage;
