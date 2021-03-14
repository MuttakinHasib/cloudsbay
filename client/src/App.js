import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Footer, Header } from './components';
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  RegisterComplete,
} from './screens';
import { auth } from './firebase';
import { loggedIn } from './redux/actions/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(loggedIn(user.email, idTokenResult.token));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route
              exact
              path='/register/complete'
              component={RegisterComplete}
            />
            <Route exact path='/password/forgot' component={ForgotPassword} />
          </Switch>
        </Container>
      </main>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;
