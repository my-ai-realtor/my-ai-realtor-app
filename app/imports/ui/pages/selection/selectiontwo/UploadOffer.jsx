/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';

const formSchema = new SimpleSchema({
  status: {
    type: String,
    allowedValues: ['Awaiting Response', 'Countered', 'Accepted', 'Rejected'],
    defaultValue: 'Awaiting Response',
  },
});
const bridge = new SimpleSchema2Bridge(formSchema);

const UploadOffer = ({ setOffer }) => {
  const handleSubmit = (data) => {
    setOffer(3);
  };

  return (
    <Container fluid className="selection-2 gray-background my-4">

      <Row className="my-4">
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-start text-box">
          <h1 className="header-title">Upload Your Offer</h1>
          <p>Upload your offer here</p>
          <input type="file" accept="application/pdf" />
          <p>What is the status of your offer?</p>
          <AutoForm schema={bridge} onSubmit={data => handleSubmit(data)}>
            <Card>
              <Card.Body>
                <SelectField name="status" />
                <SubmitField value="submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>

      </Row>
    </Container>
  );
};

UploadOffer.propTypes = {
  setOffer: PropTypes.func.isRequired,
};

export default UploadOffer;
