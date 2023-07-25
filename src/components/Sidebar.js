import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import "./Sidebar.css";

const Sidebar = ({ handleBackClick, handleHomeClick }) => (
  <div className="sidebar">
    <IconButton color="primary" onClick={handleBackClick}>
      <ArrowBackIcon style={{ fontSize: 60 }} />
    </IconButton>
    <IconButton color="primary" onClick={handleHomeClick}>
      <HomeIcon style={{ fontSize: 60 }} />
    </IconButton>
  </div>
);

export default Sidebar;
