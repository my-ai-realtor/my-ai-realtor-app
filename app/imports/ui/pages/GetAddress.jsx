import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
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
        <Col className="text-center"><h2>Please enter address you want to make offer</h2></Col>
        <AutoForm schema={bridge}>
          <Card>
            <Card.Body>
              <TextField name="address" />
              <SubmitField value="submit" />
              <ErrorsField />
            </Card.Body>
          </Card>
        </AutoForm>
        <Button id="nextButton" style={{ backgroundColor: 'transparent' }}><a href="/compprice">Next</a></Button>
        <Table striped bordered hover variant="light" style={{ border: '3px solid black' }}>
          <thead>
            <th>Address Input</th>
          </thead>
        </Table>
      </Col>
    </Row>
  </Container>
);

export default GetAddress;
