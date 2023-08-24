import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Typography,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./Content.css";

const imageVariants = {
  tap: { scale: 0.65 },
  selected: { scale: 1.1, boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)" },
};

const Content = ({
  content,
  onImageClick,
  handleToggleClick,
  contenttext,
  handleBackClick,
  showAuthors,
  setShowAuthors,
  authors,
  subTitle,
  subTitle2,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVertical, setIsVertical] = useState(false);

  console.log(authors, "toimiix");

  useEffect(() => {
    // Calculate aspect ratio when the component mounts
    const heroImage = new Image();
    heroImage.src = `http://localhost:3001${content[0].image_path}`;
    heroImage.onload = () => {
      const aspectRatio = heroImage.width / heroImage.height;
      setIsVertical(aspectRatio > 1);
      console.log(aspectRatio, "aspectratio:::");
    };
  }, [content]);

  const handleImageClick = (index) => {
    console.log(index, "indedsadsasd");
    setSelectedImage(index);
    onImageClick(index);
  };

  const handleAuthorsClick = () => {
    setShowAuthors(true);
  };

  const formatText = (text) => {
    const paragraphs = text.split(/\n{2,}/);
    const italicRegex = /\[(.*?)\]/g;

    return paragraphs.map((paragraph, index) => (
      <Typography
        key={index}
        variant="body1"
        component="span"
        gutterBottom
        sx={{
          marginTop: "22px",
          fontSize: "15px",
          lineHeight: "21px",
          fontFamily: "Montserrat",
          fontWeight: 500,
          "& .italic": {
            fontStyle: "italic",
            fontWeight: 800,
          },
        }}
      >
        {paragraph.split("\n").map((line, lineIndex) => {
          const formattedLine = line.replace(
            italicRegex,
            (_, capturedText) => `<span class="italic">${capturedText}</span>`
          );
          return (
            <React.Fragment key={lineIndex}>
              <div
                dangerouslySetInnerHTML={{ __html: formattedLine }}
                style={{ marginBottom: "11px" }} // adjust this as needed
              />
            </React.Fragment>
          );
        })}
      </Typography>
    ));
  };

  const formatAuthorsText = (text) => {
    const lines = text.split("\n");
    const formattedLines = lines.map((line, index) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        const boldPart = line.substring(0, colonIndex).trim();
        const normalPart = line.substring(colonIndex + 1).trim();
        return (
          <React.Fragment key={index}>
            <Typography
              component="span"
              variant="body1"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
              }}
            >
              {boldPart}:{" "}
            </Typography>
            <span
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              {normalPart}
            </span>
            <br />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        );
      }
    });

    return formattedLines;
  };

  const formatLahteet = (text) => {
    const lines = text.split("\n");
    const formattedLines = lines.map((line, index) => (
      <Typography
        key={index}
        component="span"
        variant="body1"
        sx={{
          fontFamily: "Montserrat",
          fontWeight: index % 2 === 0 ? "bold" : 500,
        }}
      >
        {line}
        <br />
      </Typography>
    ));

    return formattedLines;
  };

  if (showAuthors) {
    // Render the authors view here
    return (
      <Grid container spacing={22}>
        {/* First column */}
        <Grid item xs={6}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "40px",
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontStyle: "italic",
              color: "rgba(184,38,80)",
              marginLeft: "80px",
            }}
          >
            Esityksen tekijät
          </Typography>
          <Grid
            container
            direction="row"
            spacing={25}
            sx={{
              marginLeft: "-120px",
            }}
          >
            <Grid item>
              <Typography
                variant="body1"
                component="span"
                gutterBottom
                sx={{
                  marginTop: "22px",
                  fontSize: "15px",
                  lineHeight: "21px",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                }}
              >
                {authors && formatLahteet(authors[0].esiintyjat)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  height: "1000px",
                  width: "460px",
                  overflow: "auto",
                  paddingRight: "10px",
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  component="span"
                  sx={{
                    fontSize: "13px",
                    lineHeight: "1px",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                  }}
                >
                  {authors && formatAuthorsText(authors[0].tekijat)}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* Second column */}
        <Grid item xs={6}>
          <Typography
            variant="h4"
            sx={{
              marginLeft: "-20px",
              fontSize: "40px",
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontStyle: "italic",
              color: "rgba(184,38,80)",
            }}
          >
            Lähteet
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            gutterBottom
            sx={{
              marginTop: "22px",
              fontSize: "11px",
              lineHeight: "21px",
              fontFamily: "Montserrat",
              fontWeight: 500,
            }}
          >
            {authors && formatText(authors[0].lahteet)}
          </Typography>
        </Grid>
      </Grid>
    );
  }
  if (!contenttext || contenttext.length === 0) {
    return <></>;
  }
  if (!authors || authors.length === 0) {
    return <></>;
  }

  if (isVertical) {
    return (
      <Grid container>
        <Grid item sm={5}>
          <Box style={{ marginLeft: "158px", marginTop: "10px" }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Montserrat",
                fontStyle: "italic",
                fontSize: "65px",
                fontWeight: 600,
                marginTop: "105px",
                marginBottom: "20px",
                lineHeight: "1.05",
                color: "rgba(184,38,80)",
              }}
            >
              {subTitle}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                fontSize: "18px",
                fontWeight: 800,
                marginBottom: "28px",
                lineHeight: "1.2",
                color: "rgba(184,38,80)",
              }}
            >
              {subTitle2}
            </Typography>
            <Box
              style={{
                whiteSpace: "pre-wrap",
                height: "100%",
                overflow: "auto",
                marginRight: "100px",
                width: "80%",
              }}
            >
              {formatText(contenttext[0].text)}
              <Link
                variant="body2"
                component="button"
                onClick={handleAuthorsClick}
              >
                {" "}
                <Typography
                  variant="h5"
                  sx={{
                    marginLeft: "-90px",
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 800,
                    marginBottom: "28px",
                    lineHeight: "1.2",
                    color: "rgba(229, 47, 122)",
                  }}
                >
                  LÄHTEET
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 800,
                    marginBottom: "28px",
                    lineHeight: "1.2",
                    color: "rgba(229, 47, 122)",
                  }}
                >
                  ESITYKSEN TEKIJÄT
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={7}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start", // Aligns items horizontally at the start (left)
              width: "740px",
              marginRight: "208px",
              marginTop: "0px",
              zIndex: "30",
            }}
          >
            <img
              src={`http://localhost:3001${content[0].image_path}`}
              alt="Hero"
              style={{
                width: "740px",
                height: "440px",
                ...(selectedImage === 0 ? imageVariants.selected : {}),
              }}
              onClick={() => handleImageClick(0)}
              whiletap={imageVariants.tap}
              transition={{ duration: 0.1 }}
            />
            <Typography
              variant="body2"
              sx={{
                marginTop: "10px",
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "12.5px",
              }}
              gutterBottom
            >
              {content[0].imagetext}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat",
                fontStyle: "italic",
                fontSize: "11px",
                fontWeight: 500,
              }}
              gutterBottom
            >
              {content[0].imagetextbold}
            </Typography>
          </Box>

          <Grid
            container
            direction="row"
            style={{
              marginTop: "-300px",
              marginRight: "650px",
              marginLeft: "420px",
            }}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            spacing={"55px"}
          >
            {content.slice(1).map((item, index) => (
              <Grid item xs={4} style={{ margin: "25px" }} key={item.id}>
                <div
                  style={{
                    // Set your desired max width here
                    height: "215px", // Set your desired max height here
                    width: "400px",
                    objectFit: "fill",
                    marginTop: "250px",
                    zIndex: "3",
                    marginLeft: "-72px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {item.video_path ? (
                    <video
                      onClick={() => handleImageClick(index + 1)}
                      src={`http://localhost:3001${item.video_path}`}
                      poster={
                        item.image_path
                          ? `http://localhost:3001${item.image_path}`
                          : null
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        ...(selectedImage === index + 1
                          ? imageVariants.selected
                          : {}),
                      }}
                    />
                  ) : (
                    <motion.img
                      src={`http://localhost:3001${item.image_path}`}
                      alt={item.name}
                      onClick={() => handleImageClick(index + 1)}
                      whiletap={imageVariants.tap}
                      animate={
                        selectedImage === index + 1
                          ? imageVariants.selected
                          : {}
                      }
                      transition={{ duration: 0.1 }}
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    marginLeft: -40,
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                  }}
                  gutterBottom
                >
                  {item.imagetext}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    marginLeft: -40,
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                  }}
                  gutterBottom
                >
                  {item.imagetextbold}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        direction="column"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Grid
          item
          container
          direction="row"
          style={{ flex: "50% ", overflowY: "hidden" }}
          spacing={0}
        >
          <Grid item sm={5} style={{ paddingRight: "5px", width: "400px" }}>
            <Box style={{ marginLeft: "158px", marginTop: "105px" }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Montserrat",
                  fontStyle: "italic",
                  fontWeight: 600,
                  marginTop: "105px",
                }}
              >
                {subTitle}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Montserrat",
                  fontStyle: "italic",

                  fontWeight: 600,
                }}
              >
                SUOMEN KANSALLISBALETTI, 1980
              </Typography>
              <Box
                style={{
                  whiteSpace: "pre-wrap",
                  height: "100%",
                  overflow: "auto",
                  marginRight: "100px",
                }}
              >
                {formatText(contenttext[0].text)}
                <Link
                  variant="body2"
                  component="button"
                  onClick={handleAuthorsClick}
                >
                  Lähteet
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sm={7}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Aligns items horizontally at the start (left)

                marginRight: "280px",
                marginTop: "105px",
              }}
            >
              <img
                src={`http://localhost:3001${content[0].image_path}`}
                alt="Hero"
                style={{
                  maxWidth: "400px",
                  height: "600px",
                  ...(selectedImage === 0 ? imageVariants.selected : {}),
                }}
                onClick={() => handleImageClick(0)}
                whiletap={imageVariants.tap}
                transition={{ duration: 0.1 }}
              />
              <Typography variant="body2" gutterBottom>
                {content[0].imagetext}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {content[0].imagetextbold}
              </Typography>
            </Box>

            <Box
              sx={{
                marginLeft: "0",
                marginBottom: "50px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "flex-start",
                width: "600px",
              }}
            >
              {content.slice(1).map((item, index) => (
                <Grid item sm={4} key={item.id}>
                  <div
                    style={{
                      width: "300px",
                      height: "215px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {item.video_path ? (
                      <video
                        onClick={() => handleImageClick(index + 1)}
                        src={`http://localhost:3001${item.video_path}`}
                        poster={
                          item.image_path
                            ? `http://localhost:3001${item.image_path}`
                            : null
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          ...(selectedImage === index + 1
                            ? imageVariants.selected
                            : {}),
                        }}
                      />
                    ) : (
                      <motion.img
                        src={`http://localhost:3001${item.image_path}`}
                        alt={item.name}
                        onClick={() => handleImageClick(index + 1)}
                        whiletap={imageVariants.tap}
                        animate={
                          selectedImage === index + 1
                            ? imageVariants.selected
                            : {}
                        }
                        transition={{ duration: 0.1 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                  <Typography variant="body2" gutterBottom>
                    {item.imagetext}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.imagetextbold}
                  </Typography>
                </Grid>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Content;
