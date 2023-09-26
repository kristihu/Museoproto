import React from "react";
import "./Categories.css";
import Typography from "@mui/material/Typography";

const Categories = ({
  categories,
  onCategoryClick,
  selectedTitle,
  selectedSubTitle,
}) => {
  return (
    <div className="cat-container">
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          fontSize: "120px",
          marginBottom: "1px",
          fontFamily: "Montserrat",
          fontStyle: "italic",
          fontWeight: 600,
          color: "rgb(184, 38, 80)",
        }}
      >
        {selectedTitle}
      </Typography>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          fontSize: "64px",
          marginBottom: "10px",
          marginLeft: "-21px",
          fontFamily: "Montserrat",
          fontStyle: "italic",
          fontWeight: 600,
          color: "rgb(184, 38, 80)",
        }}
      >
        {selectedSubTitle}
      </Typography>
      <div className="category-grid">
        {categories.slice(0, 3).map((category) => (
          <div className="grid-item" key={category.id}>
            <div className="card" onClick={() => onCategoryClick(category.id)}>
              <img
                className="card-image"
                src={"http://localhost:3001" + category.image_path}
                alt="img"
              />
              <div className="card-content">
                <h3 className="card-title">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="category-grid2">
        {categories.slice(3, 5).map((category) => (
          <div className="grid-item" key={category.id}>
            <div className="card" onClick={() => onCategoryClick(category.id)}>
              <img
                className="card-image"
                src={"http://localhost:3001" + category.image_path}
                alt="img"
              />
              <div className="card-content">
                <h3 className="card-title">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
