/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const formSchema = new SimpleSchema({
  address: String,
  attributes: String,
});
const bridge = new SimpleSchema2Bridge(formSchema);
const SelectionOne = ({ setSelection }) => {

  const handleSubmit = (data) => {
    setSelection((prev) => prev + 1);
    console.log(1);
    useNavigate('/selection');
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Please enter address you want to make offer</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => handleSubmit(data)}>
            <Card>
              <Card.Body>
                <TextField name="address" />
                <TextField name="attributes" />
                <SubmitField value="submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

SelectionOne.propTypes = {
  setSelection: PropTypes.func.isRequired,
};

export default SelectionOne;
