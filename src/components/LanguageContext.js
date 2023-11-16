import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("fi"); // Default to Finnish

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const languageContextValue = {
    selectedLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
