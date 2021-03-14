import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const ForgotPasswordScreen = ({ history }) => {
  const { user } = useSelector(state => ({ ...state }));
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async data => {
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(data.email, config)
      .then(() => {
        setValue('email', '');
        toast.success('Please check your email for password reset link');
      })
      .catch(err => toast.error(err.message));
  };

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, []);
  return (
    <>
      <h3 className='mb-5'>Forgot Password </h3>
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
            </Form.Group>
            <Button variant='primary' type='submit' className='mr-3'>
              Sign in
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPasswordScreen;
