import React from "react";
import { Typography } from "@mui/material";
import "./subcategories.css";

const Subcategories = ({
  subcategories,
  onSubcategoryClick,

  testTitle,
}) => {
  const sortedSubcategories = subcategories
    .slice()
    .sort((a, b) => a.vuosi - b.vuosi);

  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontSize: "110px",
          fontFamily: "Montserrat",
          fontStyle: "italic",
          fontWeight: 600,
          color: "rgb(184, 38, 80)",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        {testTitle}
      </Typography>

      <div className="containerr">
        <div className="sub-grid">
          {sortedSubcategories.map((subcategory) => (
            <div className="testi" key={subcategory.id}>
              <img
                className="kuva"
                src={`http://localhost:3001${subcategory.image_path}`}
                alt={subcategory.name}
                onClick={() => onSubcategoryClick(subcategory.id)}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  marginTop: "4px",
                  marginBottom: "1px",
                  fontStyle: "italic",
                  fontWeight: 800,
                  marginLeft: "0px",
                 
                  lineHeight: "1.1",
                
             
                }}
              >
                {subcategory.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "5px",
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginLeft: "0px",
                  lineHeight: "0.95",
                
              
                }}
              >
                {subcategory.alateksti}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subcategories;
