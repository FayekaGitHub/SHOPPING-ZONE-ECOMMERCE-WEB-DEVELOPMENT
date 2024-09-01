import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store/store';

import { UserProvider } from './connectors/UserContext'; // Import UserProvider
import { CartProvider } from './connectors/CartContext';
import { Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <CartProvider>
      <UserProvider>
       <App/>
      </UserProvider>
      </CartProvider>  
  </Provider>
);

reportWebVitals();
