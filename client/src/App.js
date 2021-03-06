import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer, Header } from './components';
import { Home } from './screens';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
