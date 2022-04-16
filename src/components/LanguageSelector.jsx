import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls.js";
import "../css/LanguageSelector.css";

const LanguageSelector = ({ i18n }) => {
  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div>
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
        <button
          className="language-button"
          href="#"
          onClick={() => onChangeLanguage("tr")}
        >
          TR
        </button>
        <span className="px-2 font-weight-bold">|</span>
        <button
          className="language-button"
          onClick={() => onChangeLanguage("en")}
        >
          EN
        </button>
        <span className="px-2 font-weight-bold">|</span>
        <button
          className="language-button"
          onClick={() => onChangeLanguage("de")}
        >
          DE
        </button>
      </section>
    </div>
  );
};

export default withTranslation()(LanguageSelector);
