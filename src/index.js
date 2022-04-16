import React from 'react';
import ReactDOM from 'react-dom';
import "../src/main.scss";
import './index.css';
import App from './App';
import UserSignupPage  from './Pages/Signup/UserSignupPage.js';
import './i18n';
import UserLoginPage from './Pages/Login/UserLoginPage';


ReactDOM.render(
  <React.StrictMode>
    {/* <UserSignupPage /> */}
    <UserLoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);


