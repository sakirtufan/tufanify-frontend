import React from "react";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import LoginBg from "../../images/bg-login.png";
import Input from "../../components/input";
import "../Signup/signup.css";

const UserLoginPage = ({ t, i18n }) => {
  const [state, setState] = useState({
    username: null,
    password: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    console.log("tikladim");
  };

  return (
    <div
      id="login"
      style={{
        backgroundImage: `url(${LoginBg})`,
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="signup container d-flex justify-content-center align-items-center">
        <form className="bg-primary text-light">
          <h1 className="text-center mb-3">{t("Login")}</h1>
          <Input
            label={t("Username")}
            name="username"
            type="text"
            onChange={handleChange}
          />
          <Input
            label={t("Password")}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <button className="btn btn-info w-100 mt-5" onClick={onClickLogin}>{t("Login")}</button>
        </form>
      </section>
    </div>
  );
};

export default withTranslation()(UserLoginPage);
