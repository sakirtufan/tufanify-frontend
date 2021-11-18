import React from "react";
import Axios from "axios";
import { useState } from "react";

export const UserSignupPage = () => {

  const [state, setState] = useState({
    username: "",
    displayName: "",
    password: "",
    passwordRepeat: "",
  });

  const [agreed, setAgreed] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const { username, displayName, password } = state;

  const signupBody = {
    username,
    displayName,
    password,
  };

  const onClickSignup = (e) => {
    e.preventDefault();
    const signupURL = "http://localhost:8080/api/1.0/users";
    Axios.post(signupURL, signupBody);
  };

  return (
    <form>
      <h1> Sign Up </h1>
      <div>
        <label> Username </label>
        <input name="username" value={state.username} onChange={handleChange} />
      </div>
      <div>
        <label> Display Name </label>
        <input
          name="displayName"
          value={state.displayName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Password </label>
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Password Repeat </label>
        <input
          name="passwordRepeat"
          type="password"
          value={state.passwordRepeat}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Agreed </label>
        <input
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          type="checkbox"
        />
      </div>
      <button onClick={onClickSignup} disabled={!agreed}>        
        Sign up
      </button>
    </form>
  );
};
