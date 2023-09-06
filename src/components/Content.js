import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Typography,
  Box,
  Link,
  ImageList,
  ImageListItem,
} from "@mui/material";
import "./Content.css";

const imageVariants = {
  tap: { scale: 0.65 },
  selected: { scale: 1.1, boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)" },
};

const Content = ({
  content,
  onImageClick,

  contenttext,

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
                style={{ marginBottom: "11px" }}
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
  const titleThreshold = 20; // Adjust this value as needed

  // Determine if the title should be split into two lines
  const isLongTitle = subTitle.length > titleThreshold;

  if (showAuthors) {
    return (
      <div style={{ marginLeft: "50px" }}>
        <Grid container>
          <Grid item xs={6} direction="row">
            <Typography
              variant="h4"
              sx={{
                fontSize: "40px",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(184,38,80)",
                marginLeft: "250px",
                marginTop: "50px",
              }}
            >
              Esityksen tekijät
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "40px",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(184,38,80)",
                marginTop: "50px",
                marginLeft: "380px",
              }}
            >
              Lähteet
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          {/* First column */}
          <Grid item xs={3} sx={{ marginTop: "50px", paddingLeft: "25px" }}>
            <Typography
              variant="body1"
              component="span"
              gutterBottom
              sx={{
                paddingTop: "50px",
                marginTop: "22px",
                fontSize: "12px",
                lineHeight: "21px",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              {authors && formatLahteet(authors[0].esiintyjat)}
            </Typography>
          </Grid>

          {/* Second column */}
          <Grid item xs={5}>
            <div
              style={{
                marginTop: "50px",
                width: "550px",
                maxHeight: "850px",
                overflow: "auto",
                marginLeft: "30px",
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

          {/* Third column */}

          <Grid item xs={4} sx={{ marginLeft: "-50px", marginTop: "30px" }}>
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
      </div>
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
      <Grid container style={{ marginLeft: "100px" }}>
        <Grid item sm={5}>
          <Box style={{ marginLeft: "158px", marginTop: "10px" }}>
            <Typography
              variant="h2"
              sx={{
                maxWidth: isLongTitle ? "1000px" : "400px",
                fontFamily: "Montserrat",
                fontStyle: "italic",
                fontSize: "65px",
                fontWeight: 600,
                marginTop: "105px",
                marginBottom: "20px",
                lineHeight: "1.05",
                color: "rgba(184,38,80)",
                wordWrap: "break-word",
                width: isLongTitle ? "1000px" : "500px",

                hyphens: "auto",
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
                height: "700px",
                overflow: "auto",

                width: "500px",
                hyphens: "auto",
              }}
            >
              {formatText(contenttext[0].text)}
            </Box>
          </Box>
          <Link
            variant="body2"
            component="button"
            onClick={handleAuthorsClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "160px",
              marginTop: "10px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 800,
                color: "rgba(229, 47, 122)",
                marginRight: "60px",
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
                color: "rgba(229, 47, 122)",
              }}
            >
              ESITYKSEN TEKIJÄT
            </Typography>
          </Link>
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
              alignItems: "flex-start",
              width: "740px",
              marginRight: "320px",
              marginTop: isLongTitle ? "170px" : "-30px",
              zIndex: "30",
              marginLeft: "80px",
            }}
          >
            <img
              src={`http://localhost:3001${content[0].image_path}`}
              alt="Hero"
              style={{
                width: "815px",
                height: "550px",
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
              marginLeft: "250px",
            }}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            spacing={"100px"}
          >
            {content.slice(1).map((item, index) => (
              <Grid item xs={4} style={{ marginLeft: "50px" }} key={item.id}>
                <div
                  style={{
                    height: "215px",
                    width: "400px",
                    objectFit: "fill",
                    marginTop: "250px",
                    zIndex: "3",

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
                    marginLeft: "9px",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: "12.5px",
                  }}
                  gutterBottom
                >
                  {item.imagetext}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginLeft: "9px",
                    fontFamily: "Montserrat",
                    fontStyle: "italic",
                    fontSize: "11px",
                    fontWeight: 500,
                    textAlign: "left",
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
          style={{ overflowY: "hidden", marginLeft: "50px" }}
          spacing={0}
        >
          {/* Hero Image Container */}
          <Grid item sm={5} style={{ paddingRight: "5px", width: "400px" }}>
            <Box style={{ marginLeft: "158px" }}>
              <Typography
                variant="h2"
                sx={{
                  maxWidth: isLongTitle ? "1000px" : "400px",
                  width: isLongTitle ? "1000px" : "400px",
                  fontFamily: "Montserrat",
                  fontStyle: "italic",
                  fontSize: "65px",
                  fontWeight: 600,
                  marginTop: "105px",
                  marginBottom: "20px",
                  lineHeight: "1.05",
                  color: "rgba(184,38,80)",
                  wordWrap: "break-word",

                  hyphens: "auto",
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
                  height: "700px",
                  overflow: "auto",
                  width: "500px",
                  hyphens: "auto",
                }}
              >
                {formatText(contenttext[0].text)}
              </Box>
              <Link
                variant="body2"
                component="button"
                onClick={handleAuthorsClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 800,
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
                    color: "rgba(229, 47, 122)",
                    marginLeft: "50px",
                  }}
                >
                  ESITYKSEN TEKIJÄT
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid
            item
            xs={7}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              overflow: "hidden",
              marginTop: "105px",
            }}
          >
            {/* Hero Image */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: isLongTitle ? "105px" : "0px",
              }}
            >
              <img
                src={`http://localhost:3001${content[0].image_path}`}
                alt="Hero"
                style={{
                  maxWidth: "600px",
                  height: "800px",
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

            {/* Sliced Grid */}
            <ImageList
              cols={1}
              gap={50}
              sx={{ marginBottom: "50px", marginTop: "110px" }}
            >
              {content.slice(1).map((item, index) => (
                <ImageListItem
                  key={item.id}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                    marginLeft: "100px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "left",
                      overflow: "hidden",
                      position: "relative",
                      paddingBottom: `${(item.height / item.width) * 100}%`,
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
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "auto",
                          height: "auto",
                          cursor: "pointer",
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
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "auto",
                          height: "auto",
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

                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "12.5px",
                    }}
                    gutterBottom
                  >
                    {item.imagetext}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat",
                      fontStyle: "italic",
                      fontSize: "11px",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                    gutterBottom
                  >
                    {item.imagetextbold}
                  </Typography>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Content;
