import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Categories = ({ categories, onCategoryClick }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 112px)",
        marginTop: "112px",
        marginBottom: "162px",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h1"
            component="h1"
            align="center"
            sx={{
              fontSize: "64px",
              marginBottom: "40px",
              fontFamily: "Montserrat",
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            Esityksiä ennen ja nyt
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} justifyContent="center">
            {categories.slice(0, 3).map((category) => (
              <Grid item key={category.id}>
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    align="center"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "white",
                      padding: "8px",
                      margin: 0,
                      pointerEvents: "none", // Ignore pointer events
                      fontFamily: "Montserrat",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <img
                    src={`http://localhost:3001${category.image_path}`}
                    alt={category.name}
                    style={{ width: "300px", height: "280px" }}
                    onClick={() => onCategoryClick(category.id)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} justifyContent="center">
            {categories.slice(3, 5).map((category) => (
              <Grid item key={category.id}>
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    align="center"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "white",
                      padding: "8px",
                      margin: 0,
                      pointerEvents: "none", // Ignore pointer events
                      fontFamily: "Montserrat",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <img
                    src={`http://localhost:3001${category.image_path}`}
                    alt={category.name}
                    style={{ width: "300px", height: "300px" }}
                    onClick={() => onCategoryClick(category.id)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
