import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Categories = ({
  categories,
  onCategoryClick,
  selectedTitle,
  selectedSubTitle,
}) => {
  return (
    <div
      style={{
        marginTop: "112px",

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
              fontSize: "90px",
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
              fontSize: "50px",
              marginBottom: "0px",
              marginLeft: "-21px",
              fontFamily: "Montserrat",
              fontStyle: "italic",
              fontWeight: 600,
              color: "rgb(184, 38, 80)",
            }}
          >
            {selectedSubTitle}
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
                    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.5)",
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
                    style={{
                      width: "300px",
                      height: "280px",
                      boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.5)",
                    }}
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

                      margin: 0,
                      pointerEvents: "none",
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
                    style={{
                      width: "300px",
                      height: "300px",
                      boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.5)",
                    }}
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
