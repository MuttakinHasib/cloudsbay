import React, { useEffect } from 'react';
import { Button, Col, Form, Nav, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../firebase';
import { loggedIn } from '../redux/actions/authActions';

const LoginScreen = ({ history }) => {
  const { user } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = async data => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(loggedIn(user.email, idTokenResult.token));

        toast.success(`Welcome back!`);
        history.push('/');
      }
      setValue('email', '');
      setValue('password', '');
    } catch (err) {
      console.log(err.message);
      console.error(err);
    }
  };

  const googleLogin = async () => {
    try {
      const { user } = auth.signInWithPopup(googleAuthProvider);
      const idTokenResult = await user.getIdTokenResult();
      toast.success(`Welcome back!`);
      history.push('/');
      dispatch(loggedIn(user.email, idTokenResult.token));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);
  return (
    <>
      <h1 className='text-center mb-5'>Hey, Welcome Back! </h1>
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
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={register}
                name='password'
                type='password'
                placeholder='Enter password'
              />
            </Form.Group>
            <Link to='/password/forgot' className='d-block mb-3'>
              Forgot your password?
            </Link>
            <Button variant='primary' type='submit' className='mr-3'>
              Sign in
            </Button>
            <Button variant='danger' type='button' onClick={googleLogin}>
              Continue with Google
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
