import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById('root')
);
