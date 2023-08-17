import React from "react";
import { Select, MenuItem } from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import { useLanguage } from "./LanguageContext"; // Import useLanguage hook
import "./Sidebar.css";
import arrowBackImage from "../images/takaisin.png";
import homeImage from "../images/koti.png";

const Sidebar = ({ handleBackClick, handleHomeClick, handlePlayToggle }) => {
  const { selectedLanguage, changeLanguage } = useLanguage(); // Use the useLanguage hook

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value); // Call the changeLanguage function when the language is changed
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
      <div className="language-select">
        <LanguageIcon style={{ fontSize: 40 }} />
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          variant="outlined"
          color="primary"
          className="language-select"
        >
          <MenuItem value="fi">Finnish</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="sv">Swedish</MenuItem>
          {/* Add more languages as needed */}
        </Select>
      </div>
      <div className="play-pause-buttons">
        {/* Play button */}
        <button onClick={() => handlePlayToggle(true)}>Play</button>
        {/* Pause button */}
        <button onClick={() => handlePlayToggle(false)}>Pause</button>
      </div>
    </div>
  );
};

export default Sidebar;
