import React from "react";
import "./signup.css";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import { signup, changeLanguage } from "../../api/apiCalls";
import signupBg from "../../images/bg-signup.png";
import Input from "../../components/input";

const UserSignupPage = ({ t, i18n }) => {
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

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
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
      <section className="d-none d-md-block text-right pt-3">
        <img
          src="https://countryflagsapi.com/png/tr"
          alt="Turkish Flag"
          onClick={() => onChangeLanguage("tr")}
          className="language-flag"
        ></img>
        <img
          src="https://countryflagsapi.com/png/usa"
          alt="USA Flag"
          onClick={() => onChangeLanguage("en")}
          className="language-flag"
        ></img>
        <img
          src="https://countryflagsapi.com/png/de"
          alt="Germany Flag"
          onClick={() => onChangeLanguage("de")}
          className="language-flag"
        ></img>
      </section>
      <section className="pr-3 d-md-none text-right pt-3">
        <button className="language-button" href="#" onClick={() => onChangeLanguage("tr")}>
          TR
        </button><span className="px-2 font-weight-bold">|</span>
        <button className="language-button" onClick={() => onChangeLanguage("en")} >
          EN
        </button><span className="px-2 font-weight-bold">|</span>
        <button className="language-button" onClick={() => onChangeLanguage("de")} >
          DE
        </button>
      </section>
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
