import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
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
    Addresses.collection.insert(
      { address },
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
          <Col className="text-center"><h2>Please enter address you want to make offer</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="address" id="id1" />
                <SubmitField value="submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Button id="nextButton" style={{ backgroundColor: 'transparent' }}><a href="/compprice">Next</a></Button>
          <Table striped bordered hover variant="light" style={{ border: '3px solid black' }}>
            <thead>
              <tr>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <h6>Address should be in here</h6>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default GetAddress;
