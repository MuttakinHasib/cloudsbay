import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = async data => {
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(data.email, config);
    toast.success(
      `Email is sent to ${data.email}. Click the link to complete your registration`
    );
    window.localStorage.setItem('emailForRegistration', data.email);
    setValue('email', '');
  };
  return (
    <>
      <h1 className='text-center mb-5'>Hey, Welcome to Family! </h1>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={register}
                name='email'
                type='email'
                placeholder='Enter email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default RegisterScreen;
