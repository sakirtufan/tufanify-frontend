import React from "react";
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

  return (
    <form>
      <h1>Sign Up </h1>
      <div>
        <label>Username</label>
        <input name="username" value={state.username} onChange={handleChange} />
      </div>
      <div>
        <label>Display Name</label>
        <input
          name="displayName"
          value={state.displayName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password Repeat</label>
        <input
          name="passwordRepeat"
          type="password"
          value={state.passwordRepeat}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Agreed</label>
        <input
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          type="checkbox"
        />
      </div>

      <button disabled={!agreed}>Sign up</button>
    </form>
  );
};
