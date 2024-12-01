import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import MakeOfferPage from './MakeOffer';
import UploadOffer from './UploadOffer';
import Initial from './Initial';
import Finance from './Finance';
import FinanceQuestions from './FinanceQuestions';

const SelectionTwo = ({ setSelection }) => {

  const saved = sessionStorage.getItem('offer');
  const init = (saved !== null ? parseInt(saved, 10) : 0);
  const [offer, setOffer] = useState(init);
  useEffect(() => {
    sessionStorage.setItem('offer', offer);
  });

  const pages = {};

  pages[0] = <Initial setOffer={setOffer} />;
  pages[1] = <UploadOffer setOffer={setOffer} />;
  pages[2] = <MakeOfferPage setOffer={setOffer} />;
  pages[3] = <FinanceQuestions setOffer={setOffer} />;
  pages[4] = <Finance setSelection={setSelection} />;

  return (
    <Container className="py-3">
      <Row>
        {pages[offer]}
      </Row>
      <Row>
        <button type="button" onClick={() => setOffer(0)} className="getting-started-link">
          Back
        </button>
      </Row>
    </Container>
  );
};

SelectionTwo.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionTwo;
