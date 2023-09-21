import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";

const Categories = ({
  categories,
  onCategoryClick,
  selectedTitle,
  selectedSubTitle,
}) => {
  return (
    <div
      style={{
        marginTop: "105px",

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
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} justifyContent="center">
            {categories.slice(0, 3).map((category) => (
              <Grid item key={category.id}>
                <Card
                  onClick={() => onCategoryClick(category.id)}
                  sx={{
                    color: "rgb(164,216,222)",
                    width: "400px",
                    border: "4px solid rgb(0, 71, 105)",
                    boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.5)",
                    margin: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="266px"
                      width="400px"
                      image={"http://localhost:3001" + category.image_path}
                      alt="img"
                    />
                    <CardContent
                      sx={{
                        backgroundColor: "rgb(0, 71, 105)",
                        height: "70px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Montserrat",
                          fontStyle: "italic",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                        gutterBottom
                        variant="h3"
                        component="div"
                      >
                        {category.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ marginTop: "-25px", paddingLeft: "50px" }}
          >
            {categories.slice(3, 5).map((category) => (
              <Grid item key={category.id}>
                <Card
                  onClick={() => onCategoryClick(category.id)}
                  sx={{
                    maxWidth: 345,
                    border: "4px solid rgb(0, 71, 105)",
                    boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.5)",
                    margin: "20px",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="247px"
                      width="350px"
                      image={"http://localhost:3001" + category.image_path}
                      alt="img"
                    />
                    <CardContent
                      sx={{
                        backgroundColor: "rgb(0, 71, 105)",
                        height: "70px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgb(164,216,222)",
                          fontFamily: "Montserrat",
                          fontStyle: "italic",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                        gutterBottom
                        variant="h3"
                        component="div"
                      >
                        {category.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
