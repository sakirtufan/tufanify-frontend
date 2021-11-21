import React from 'react';
import ReactDOM from 'react-dom';
import "../src/main.scss";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserSignupPage } from './Signup/UserSignupPage';

ReactDOM.render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>,
  document.getElementById('root')
);


