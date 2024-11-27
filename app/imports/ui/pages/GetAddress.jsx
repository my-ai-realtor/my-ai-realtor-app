import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Addresses } from '../../api/address/Address';

const formSchema = new SimpleSchema({
  address: String,
});
const bridge = new SimpleSchema2Bridge(formSchema);
const GetAddress = () => {
  const submit = (data, formRef) => {
    const { address } = data;
    const owner = Meteor.user().username;
    Addresses.collection.insert(
      { address, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Address added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Please enter address you are interested</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="address" />
                <SubmitField value="submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Button variant="outline-primary" onClick={GetAddress} className="mt-4">Add New Address</Button>
        </Col>
      </Row>
      <a href="/getting-started" className="btn active" role="button" aria-pressed="true">Next Link</a>
    </Container>
  );
};

export default GetAddress;
