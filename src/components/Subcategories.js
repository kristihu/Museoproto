import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import "./subcategories.css";

const Subcategories = ({
  subcategories,
  onSubcategoryClick,
  lastCategoryId,
  categories,
  selectedCategory,
  selectedLanguage,
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
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        {testTitle}
      </Typography>

      <div className="containerr">
        <div className="sub-grid">
          {sortedSubcategories.map((subcategory) => (
            <div class="subcard stacked featured" key={subcategory.id}>
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
                  marginTop: "0px",
                  marginBottom: "1px",
                  fontStyle: "italic",
                  fontWeight: 800,
                  marginLeft: "0px",
                  hyphens: " auto",
                  lineHeight: "1.1",
                  maxWidth: "400px",
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
                  wordWrap: "break-word",
                  maxWidth: "100%",
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
