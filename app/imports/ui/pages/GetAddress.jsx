import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  address: String,
});
const bridge = new SimpleSchema2Bridge(formSchema);
const GetAddress = () => {
  const submit = (data, formRef) => {
    const { address } = data;
    if (address === '') {
      swal('Error', 'Address need to input', 'error');
    } else {
      swal('Success', 'Item added successfully', 'success');
      formRef.reset();
    }
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
                <TextField name="address" />
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

export default GetAddress;
