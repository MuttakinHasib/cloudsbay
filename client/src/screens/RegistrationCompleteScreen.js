import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { auth } from '../firebase';

const RegistrationCompleteScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = async ({ password, confirmPassword }) => {
    try {
      if (password && confirmPassword && password === confirmPassword) {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        setValue('password', '');
        setValue('confirmPassword', '');

        if (result.user.emailVerified) {
          window.localStorage.removeItem('emailForRegistration');

          let user = auth.currentUser;
          await user.updatePassword(password);
          const idTokenResult = await user.getIdTokenResult();

          console.log(user, idTokenResult);
          history.push('/');
        }
      } else {
        toast.error("Your password doesn't matches");
      }
    } catch (err) {
      toast.error(err.message);
    }
    // const config = {
    //   url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    //   handleCodeInApp: true,
    // };
    // await auth.sendSignInLinkToEmail(data.email, config);
    // toast.success(
    //   `Email is sent to ${data.email}. Click the link to complete your registration`
    // );
    // window.localStorage.setItem('emailForRegistration', data.email);
    // setValue('email', '');
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  return (
    <>
      <h1 className='text-center mb-5'>Please Complete Your Registration</h1>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='formBasicEmail'>
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control
                name='email'
                type='email'
                disabled
                defaultValue={email}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                ref={register}
                name='password'
                type='password'
                placeholder='New Password'
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              {/* <Form.Label>Confirm Password</Form.Label> */}
              <Form.Control
                ref={register}
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
              />
            </Form.Group>

            <Button variant='success' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default RegistrationCompleteScreen;
