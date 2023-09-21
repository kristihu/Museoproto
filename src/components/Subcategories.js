import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const Subcategories = ({
  subcategories,
  onSubcategoryClick,
  lastCategoryId,
  categories,
  selectedCategory,
  selectedLanguage,
  testTitle,
}) => {
  console.log("Categories:", selectedLanguage);
  console.log("Last Category ID:", lastCategoryId);
  console.log("title", lastCategoryId);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "112px",
          marginTop: "60px",
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: "110px",
            fontFamily: "Montserrat",
            fontStyle: "italic",
            fontWeight: 600,
            color: "rgb(184, 38, 80)",
            marginTop: "150px",
          }}
        >
          {testTitle}
        </Typography>
      </div>
      <Grid
        container
        sx={{
          flexWrap: "wrap",
          marginLeft: "300px",
          marginTop: "150px", // Center the grid horizontally
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
              width: "280px",
              height: "auto",
              marginTop: "50px",
              marginBottom: "20px",
              marginLeft: "-85px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                textAlign: "left",
                marginTop: "-30px",
                marginBottom: "0px",
              }}
            >
              <img
                src={`http://localhost:3001${subcategory.image_path}`}
                alt={subcategory.name}
                style={{
                  width: "300px",
                  height: "210px",
                  objectFit: "cover",
                  boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => onSubcategoryClick(subcategory.id)}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Montserrat",
                  marginTop: "10px",
                  marginBottom: "5px",
                  fontStyle: "italic",
                  fontWeight: 800, // boldimmaksi
                  marginLeft: "0px",
                  wordWrap: "break-word",
                  lineHeight: "1.1",
                  maxWidth: "280px",
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
                  lineHeight: "0.95",
                  wordWrap: "break-word",
                  maxWidth: "280px",
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
