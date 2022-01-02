import React from "react";
import "./signup.css";
import { useState } from "react";
import { signup } from "../../api/apiCalls";
import signupBg from "../../images/bg-signup.png";
import Input from "../../components/input";

export const UserSignupPage = () => {
  const [state, setState] = useState({
    username: "",
    displayName: "",
    password: "",
    passwordRepeat: "",
    pendingApiCall: false,
    errors: {},
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...state.errors };
    errors[name] = undefined;
    setState({ ...state, [name]: value, errors });
  };

  const onClickSignup = (e) => {
    e.preventDefault();
    const { username, displayName, password } = state;
    const body = { username,displayName,password };

    setState({
      ...state,
      pendingApiCall: true,
    });

    signup(body)
      .then((response) => {
        setState({
          ...state,
          pendingApiCall: false,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          pendingApiCall: false,
        });
        if (error.response.data.validationErrors) {
          setState({
            ...state,
            errors: error.response.data.validationErrors,
          });
        }
      });
  };

  return (
    <div
      id="signup"
      style={{
        backgroundImage: `url(${signupBg})`,
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="signup container d-flex justify-content-center align-items-center">
        <form className="bg-primary text-light">
          <h1 className="text-center mb-3"> Sign Up </h1>
          <Input label="Username" error={state.errors.username} name="username" onChange={handleChange}/>
          <Input label="Display Name" error={state.errors.displayName} name="displayName" onChange={handleChange}/>
          <Input label="Password" error={state.errors.password} name="password" onChange={handleChange} type="password"/>
          <div className="mb-3">
            <label className="form-label"> Password Repeat </label>
            <input
              className="form-control"
              name="passwordRepeat"
              type="password"
              value={state.passwordRepeat}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-info w-100 mt-5"
            onClick={onClickSignup}
            disabled={state.pendingApiCall}
          >
            
            {state.pendingApiCall && (
              <span className="spinner-border spinner-border-sm"> </span>
            )}
            Sign up
          </button>
        </form>
      </section>
    </div>
  );
};
