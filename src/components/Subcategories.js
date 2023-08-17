import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const Subcategories = ({
  subcategories,
  onSubcategoryClick,
  lastCategoryId,
  categories,
  selectedCategory,
}) => {
  console.log("Categories:", categories);
  console.log("Last Category ID:", lastCategoryId);
  const category = categories.find((cat) => cat.id === lastCategoryId);
  console.log("title", lastCategoryId);
  return (
    <div>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontSize: "90px",
          fontFamily: "Montserrat",
          fontStyle: "italic",
          fontWeight: 600,
          marginTop: "110px",
          color: "rgb(184, 38, 80)",
        }}
      >
        {selectedCategory}
      </Typography>
      <Grid
        container
        sx={{
          flexWrap: "wrap",
          marginTop: "70px",
          marginLeft: "16.5%",
        }}
        justifyContent="center"
        alignItems="center"
        columnSpacing={-50}
      >
        {subcategories.map((subcategory) => (
          <Grid
            item
            xs={3}
            key={subcategory.id}
            sx={{
              width: "240px",
              height: "164px",
              marginBottom: "60px",
              marginLeft: "-40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align text to the left
                justifyContent: "center",
                textAlign: "left",
                marginTop: "-0px",
                marginBottom: "144px",
              }}
            >
              <img
                src={`http://localhost:3001${subcategory.image_path}`}
                alt={subcategory.name}
                style={{
                  width: "240px",
                  height: "164px",
                  objectFit: "cover",
                  boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => onSubcategoryClick(subcategory.id)}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Montserrat",
                  fontStyle: "italic",
                  fontWeight: 800, // boldimmaksi
                  marginLeft: "0px", // Add left margin for better alignment
                }}
              >
                {subcategory.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "12px",
                  fontWeight: 500, // boldimmaksi
                  marginLeft: "0px",
                  lineHeight: "0.95", // Add left margin for better alignment
                }}
              >
                {subcategory.alateksti}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Subcategories;
