import React from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

interface LanguageSwitcherProps {
  currentLanguage: string;
  availableLanguages: { code: string; name: string }[]; 
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  availableLanguages,
}) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="lg:flex lg:justify-end text-white">
      <div className="language-switcher">
        {availableLanguages.map(({ code, name }) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`language-button ${currentLanguage === code ? "active" : ""}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
