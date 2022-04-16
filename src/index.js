import React from 'react';
import ReactDOM from 'react-dom';
import "../src/main.scss";
import './index.css';
import App from './App';
import UserSignupPage  from './Pages/Signup/UserSignupPage.js';
import './i18n';
import UserLoginPage from './Pages/Login/UserLoginPage';
import LanguageSelector from './components/LanguageSelector';


ReactDOM.render(
  <React.StrictMode>
    {/* <UserSignupPage /> */}
    <LanguageSelector/>
    <UserLoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);


