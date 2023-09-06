import React, { useState } from "react";
import { IconButton } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useLanguage } from "./LanguageContext";
import "./Sidebar.css";
import arrowBackImage from "../images/takaisin.png";
import homeImage from "../images/koti.png";
import sv from "../images/sv.png";
import fi from "../images/fi.png";
import en from "../images/en.png";

const Sidebar = ({
  handleBackClick,
  handleHomeClick,
  handlePlayToggle,
  socket,
  handleResetProjector,
}) => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [highlightedLanguage, setHighlightedLanguage] =
    useState(selectedLanguage);

  const handleLanguageChange = (language) => {
    socket.emit("languageIconClicked");
    changeLanguage(language);
    setHighlightedLanguage(language);
  };

  return (
    <div className="sidebar">
      <div className="custom-icon-button" onClick={handleBackClick}>
        <img
          src={arrowBackImage}
          alt="Back"
          style={{ width: 60, height: 60 }}
        />
      </div>
      <div className="custom-icon-button" onClick={handleHomeClick}>
        <img src={homeImage} alt="Home" style={{ width: 60, height: 60 }} />
      </div>
      <div className="language-icons">
        <IconButton
          onClick={() => handleLanguageChange("fi")}
          className={highlightedLanguage === "fi" ? "highlighted-language" : ""}
        >
          <img src={fi} alt="Finnish" style={{ width: 40, height: 40 }} />
        </IconButton>
        <IconButton
          onClick={() => handleLanguageChange("en")}
          className={highlightedLanguage === "en" ? "highlighted-language" : ""}
        >
          <img src={en} alt="English" style={{ width: 40, height: 40 }} />
        </IconButton>
        <IconButton
          onClick={() => handleLanguageChange("sv")}
          className={highlightedLanguage === "sv" ? "highlighted-language" : ""}
        >
          <img src={sv} alt="Swedish" style={{ width: 40, height: 40 }} />
        </IconButton>
      </div>
      <div className="play-pause-buttons">
        <IconButton
          onClick={() => handlePlayToggle(true)}
          sx={{ color: "rgb(229, 47, 122)", fontSize: "100px" }}
        >
          <PlayArrowIcon sx={{ fontSize: "70px" }} />
        </IconButton>

        <IconButton
          onClick={() => handlePlayToggle(false)}
          sx={{ color: "rgb(229, 47, 122)" }}
        >
          <PauseIcon sx={{ fontSize: "70px" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
