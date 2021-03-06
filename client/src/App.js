import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer, Header } from './components';
import { Home, Login, Register, RegisterComplete } from './screens';

const App = () => {
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
          </Switch>
        </Container>
      </main>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;
