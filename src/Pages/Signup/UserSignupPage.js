import React from "react";
import "./signup.css";
import { useState } from "react";
import {signup} from "../../api/apiCalls"
import signupBg from "../../images/bg-signup.png";

export const UserSignupPage = () => {

  const [state, setState] = useState({
    username: "",
    displayName: "",
    password: "",
    passwordRepeat: "",
    pendingApiCall: false,
    errors:{}
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...state.errors};
    errors[name] = undefined;

    setState({
      ...state,
      [name]: value,
      errors
    });
  };

  const onClickSignup = (e) => {
    e.preventDefault();
    const { username, displayName, password } = state;
    const body = {
      username,
      displayName,
      password,
    };

    setState({...state,
      pendingApiCall: true,
    });

    signup(body)
    .then((response) => {
      setState({...state, pendingApiCall: false});
    })
    .catch((error)=>{   
      setState({...state, pendingApiCall: false});
      if(error.response.data.validationErrors){
        setState({...state, errors : error.response.data.validationErrors})
      }     
    })
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
          <div className="mb-3 form-group">
            <label htmlFor="username" className="form-label"> Username </label>
            <input
              className={state.errors.username ? 'form-control is-invalid' : 'form-control'}
              id="username"
              name="username"
              required
              value={state.username}
              onChange={handleChange}
            />
             <div className="invalid-feedback">{state.errors.username}</div>
          </div>
          <div className="mb-3">
            <label className="form-label"> Display Name </label>
            <input
              className="form-control"
              name="displayName"
              value={state.displayName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Password </label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
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
            {state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            Sign up
          </button>
        </form>
      </section>
    </div>
  );
};
