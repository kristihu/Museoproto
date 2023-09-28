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
  content,
  togglePause,
  playpause,
}) => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [highlightedLanguage, setHighlightedLanguage] =
    useState(selectedLanguage);
  const [activeButton, setActiveButton] = useState("play");

  const handleLanguageChange = (language) => {
    if (language === highlightedLanguage) {
      return;
    }

    socket.emit("languageIconClicked");
    changeLanguage(language);
    setHighlightedLanguage(language);
  };

  return (
    <div className="sidebar">
      <div className="language-icons">
        <IconButton
          onClick={() => handleLanguageChange("fi")}
          className={highlightedLanguage === "fi" ? "highlighted-language" : ""}
        >
          <img src={fi} alt="Finnish" style={{ width: "75%", height: "75%" }} />
        </IconButton>
        {/*  <IconButton
          onClick={() => handleLanguageChange("en")}
          className={highlightedLanguage === "en" ? "highlighted-language" : ""}
        >
          <img src={en} alt="English" style={{ width: "75%", height: "75%" }} />
        </IconButton> */}

        <IconButton
          onClick={() => handleLanguageChange("sv")}
          className={highlightedLanguage === "sv" ? "highlighted-language" : ""}
        >
          <img src={sv} alt="Swedish" style={{ width: "75%", height: "75%" }} />
        </IconButton>
      </div>

      <div className="custom-icons-container">
        <div className="custom-icon-button" onClick={handleHomeClick}>
          <img src={homeImage} alt="Home" style={{ width: 100, height: 100 }} />
        </div>
        <div className="custom-icon-button" onClick={handleBackClick}>
          <img
            src={arrowBackImage}
            alt="Back"
            style={{ width: 100, height: 100 }}
          />
        </div>
      </div>
      <div className="play-pause-container">
        {content.length > 0 && (
          <div className="play-pause-buttons">
            <h4 className="karuselli">Kuvakaruselli</h4>
            {playpause ? (
              <IconButton
                onClick={() => {
                  togglePause();
                }}
                sx={{
                  color: "rgb(229, 47, 122)",
                  fontSize: "100px",
                  marginLeft: "20px",
                  marginTop: "-20px",
                }}
                className={activeButton === "play" ? "highlighted" : ""}
              >
                <PlayArrowIcon sx={{ fontSize: "130px" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  togglePause();
                }}
                sx={{
                  color: "rgb(229, 47, 122)",
                  marginLeft: "30px",
                  marginTop: "-20px",
                }}
                className={activeButton === "pause" ? "highlighted" : ""}
              >
                <PauseIcon sx={{ fontSize: "130px" }} />
              </IconButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
