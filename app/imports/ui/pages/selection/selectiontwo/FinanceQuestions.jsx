/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { AutoForm, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  loan: {
    type: String,
    allowedValues: ['Yes', 'No'],
    defaultValue: 'No',
  },
  loanAmt: Number,
  letter: {
    type: String,
    allowedValues: ['Yes', 'No'],
    defaultValue: 'No',
  },
  aggressiveness: {
    type: String,
    allowedValues: ['Very Aggressively', 'Somewhat Aggressively', 'Not Aggressively'],
    defaultValue: 'Somewhat Aggressively',
  },
  propertyType: {
    type: String,
    allowedValues: ['Investment', 'Residential Property'],
    defaultValue: 'Residential Property',
  },
});
const bridge = new SimpleSchema2Bridge(formSchema);

const FinanceQuestions = ({ setOffer }) => {
  const handleSubmit = (data) => {
    setOffer(4);
  };

  return (
    <Container fluid className="vh-100">

      <Row className="h-100">
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-start text-box">
          <h1 className="header-title">Final Questions</h1>
          <p>We just need to ask a few more questions about your offer.</p>
          <AutoForm schema={bridge} onSubmit={data => handleSubmit(data)}>
            <Card>
              <Card.Body>
                <SelectField name="loan" />
                <NumField name="loanAmt" />
                <SelectField name="letter" />
                <SelectField name="aggressiveness" />
                <SelectField name="propertyType" />
                <SubmitField value="submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>

      </Row>
    </Container>
  );
};

FinanceQuestions.propTypes = {
  setOffer: PropTypes.func.isRequired,
};

export default FinanceQuestions;
