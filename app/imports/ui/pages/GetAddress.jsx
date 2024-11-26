import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  address: String,
});
const bridge = new SimpleSchema2Bridge(formSchema);
const GetAddress = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={5}>
        <Col className="text-center"><h2>Please enter address you are interested</h2></Col>
        <AutoForm schema={bridge}>
          <Card>
            <Card.Body>
              <TextField name="address" />
              <SubmitField value="submit" />
              <ErrorsField />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
      <Button>Next</Button>
    </Row>
  </Container>
);

export default GetAddress;
