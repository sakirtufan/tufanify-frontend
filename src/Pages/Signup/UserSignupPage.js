import React from "react";
import "./signup.css";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import { signup } from "../../api/apiCalls";
import signupBg from "../../images/bg-signup.png";
import Input from "../../components/input";

const UserSignupPage = ({ t }) => {
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
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    setState({ ...state, [name]: value, errors });
  };

  const onClickSignup = (e) => {
    e.preventDefault();
    const { username, displayName, password } = state;
    const body = { username, displayName, password };

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
      <div>
        <section className="signup container d-flex justify-content-center align-items-center">
          <form className="bg-primary text-light">
            <h1 className="text-center mb-3">{t("Sign Up")}</h1>
            <Input
              label={t("Username")}
              error={state.errors.username}
              name="username"
              onChange={handleChange}
            />
            <Input
              label={t("Display Name")}
              error={state.errors.displayName}
              name="displayName"
              onChange={handleChange}
            />
            <Input
              label={t("Password")}
              error={state.errors.password}
              name="password"
              onChange={handleChange}
              type="password"
            />
            <Input
              label={t("Password Repeat")}
              error={state.errors.passwordRepeat}
              name="passwordRepeat"
              onChange={handleChange}
              type="password"
            />
            <button
              className="btn btn-info w-100 mt-5"
              onClick={onClickSignup}
              disabled={
                state.pendingApiCall ||
                state.errors.passwordRepeat !== undefined
              }
            >
              {state.pendingApiCall && (
                <span className="spinner-border spinner-border-sm"> </span>
              )}
              {t("Sign Up")}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default withTranslation()(UserSignupPage);
