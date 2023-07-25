import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const Subcategories = ({ subcategories, onSubcategoryClick }) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontFamily: "Montserrat",
          fontStyle: "italic",
          fontWeight: 600,
          marginTop: "110px",
          marginBottom: "70px",
        }}
      >
        Title Here
      </Typography>
      <Grid
        container
        style={{
          marginLeft: "311px",
          maxWidth: "60%",
          flexWrap: "wrap",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        {subcategories.map((subcategory) => (
          <Grid item xs={3} key={subcategory.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                marginTop: "-30px",
              }}
            >
              <div
                style={{
                  width: "240px",
                  height: "164px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:3001${subcategory.image_path}`}
                  alt={subcategory.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onClick={() => onSubcategoryClick(subcategory.id)}
                />
              </div>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  fontFamily: "Montserrat",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                {subcategory.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Subcategories;
