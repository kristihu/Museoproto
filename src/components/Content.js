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
  tap: { scale: 0.8 },
  selected: { scale: 1, boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 1)" },
};

const Content = ({
  content,
  onImageClick,

  contenttext,
  lahdeTitles,

  showAuthors,
  setShowAuthors,
  authors,
  subTitle,
  subTitle2,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVertical, setIsVertical] = useState(false);

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
        component="div"
        gutterBottom
        sx={{
          marginTop: "22px",
          fontSize: "14px",
          lineHeight: "21px",
          fontFamily: "Montserrat",
          fontWeight: 400,
          "& .italic": {
            fontStyle: "italic",
            fontWeight: 500,
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
  const formatTextt = (text) => {
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
          fontSize: "16px",
          lineHeight: "21px",
          fontFamily: "Montserrat",
          fontWeight: 500,
          "& .italic": {
            fontStyle: "italic",
            fontWeight: 500,
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
  const titleThreshold = 20;

  const isLongTitle = subTitle.length > titleThreshold;

  if (showAuthors && authors.length > 0) {
    return (
      <div style={{ marginLeft: "60px", marginRight: "60px" }}>
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
              {lahdeTitles[1]}
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
              {lahdeTitles[0]}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          {/* First column */}
          <Grid item xs={4} sx={{ marginTop: "50px", paddingLeft: "25px" }}>
            <Typography
              variant="body1"
              component="span"
              gutterBottom
              sx={{
                paddingTop: "50px",
                marginTop: "22px",
                fontSize: "13px",
                lineHeight: "21px",
                fontFamily: "Montserrat",
                fontWeight: 500,
                wordWrap: "inherit",
              }}
            >
              {authors && formatLahteet(authors[0].esiintyjat)}
            </Typography>
          </Grid>

          {/* Second column */}
          <Grid item xs={4}>
            <div
              style={{
                marginTop: "25px",
                width: "75%",
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
                  fontSize: "16px",
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

          <Grid item xs={4} sx={{ marginLeft: "", marginTop: "30px" }}>
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
              {authors && formatTextt(authors[0].lahteet)}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {isVertical ? (
        <>
          <div className="kont">
            <div className="tekstit">
              <Typography
                variant="h2"
                sx={{
                  maxWidth: "100%",
                  fontFamily: "Montserrat",
                  fontStyle: "italic",
                  fontSize: "60px",
                  fontWeight: 600,
                  marginBottom: "20px",
                  lineHeight: "1.05",
                  color: "rgba(184,38,80)",
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
              <div className="scrollbar">
                <Box
                  style={{
                    whiteSpace: "pre-wrap",
                    maxHeight: "90%",
                    overflow: "auto",
                    width: "100%",
                    hyphens: "auto",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {formatText(contenttext[0].text)}
                </Box>
              </div>
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
                    marginRight: "60px",
                  }}
                >
                  {lahdeTitles[1]}
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
                  {lahdeTitles[0]}
                </Typography>
              </Link>
            </div>
            <div className="hero">
              <div className="testcontainer">
                <motion.div whileTap={imageVariants.tap}>
                  <motion.img
                    src={`http://localhost:3001${content[0].image_path}`}
                    alt="Hero"
                    style={{
                      width: "100%",
                      ...(selectedImage === 0 ? imageVariants.selected : {}),
                    }}
                    onClick={() => handleImageClick(0)}
                    whiletap={imageVariants.tap}
                    transition={{ duration: 0.1 }}
                  />
                </motion.div>
                <div>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "12.5px",
                    }}
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
                  >
                    {content[0].imagetextbold}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="loput">
              {content.slice(1).map((item, index) => (
                <div className="joku" key={item.id}>
                  {item.video_path ? (
                    <div style={{ position: "relative" }}>
                      <video
                        onClick={() => handleImageClick(index + 1)}
                        src={`http://localhost:3001${item.video_path}`}
                        poster={
                          item.image_path
                            ? `http://localhost:3001${item.image_path}`
                            : null
                        }
                        style={{
                          width: "350px",
                          marginRight: "1rem",

                          cursor: "pointer",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(index + 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 64 64"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="30"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                          <polygon
                            points="45.04 32 24.96 45.04 24.96 18.96 45.04 32"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <motion.div whileTap={imageVariants.tap}>
                      <motion.img
                        className="testiimage"
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
                          cursor: "pointer",
                          maxWidth: "80%",
                          width: "84%",
                        }}
                      />
                    </motion.div>
                  )}
                  <div className="text-container">
                    <Typography
                      variant="body2"
                      style={{
                        textAlign: "left",
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "12.5px",
                        hyphens: "auto",
                        maxWidth: "100%",
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="kont-vert">
            <div className="tekstit-vert">
              <Typography
                variant="h2"
                sx={{
                  maxWidth: "100%",
                  fontFamily: "Montserrat",
                  fontStyle: "italic",
                  fontSize: "60px",
                  fontWeight: 600,
                  marginBottom: "20px",
                  lineHeight: "1.05",
                  color: "rgba(184,38,80)",
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
                className="Box"
                style={{
                  fontFamily: "Montserrat",
                  whiteSpace: "pre-wrap",
                  maxHeight: "70%",
                  overflow: "auto",
                  width: "100%",
                  hyphens: "auto",
                  wordWrap: "break-word",
                  maxWidth: "100%",
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
                    marginRight: "60px",
                  }}
                >
                  {lahdeTitles[1]}
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
                  {lahdeTitles[0]}
                </Typography>
              </Link>
            </div>
            <div className="hero-vert">
              <div className="testcontainer2">
                <motion.div whileTap={imageVariants.tap}>
                  <motion.img
                    src={`http://localhost:3001${content[0].image_path}`}
                    alt="Hero"
                    style={{
                      width: "90%",
                      height: "50rem",
                      ...(selectedImage === 0 ? imageVariants.selected : {}),
                    }}
                    onClick={() => handleImageClick(0)}
                    whiletap={imageVariants.tap}
                    transition={{ duration: 0.1 }}
                  />
                </motion.div>
                <div>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "12.5px",
                    }}
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
                  >
                    {content[0].imagetextbold}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="loput-vert">
              {content.slice(1).map((item, index) => (
                <div className="joku-vert" key={item.id}>
                  {item.video_path ? (
                    <div style={{ position: "relative" }}>
                      <video
                        onClick={() => handleImageClick(index + 1)}
                        src={`http://localhost:3001${item.video_path}`}
                        poster={
                          item.image_path
                            ? `http://localhost:3001${item.image_path}`
                            : null
                        }
                        style={{
                          maxWidth: "90%",
                          maxHeight: "100%",
                          width: "auto",
                          height: "auto",
                          cursor: "pointer",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(index + 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 64 64"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="30"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                          <polygon
                            points="45.04 32 24.96 45.04 24.96 18.96 45.04 32"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <motion.div whileTap={imageVariants.tap}>
                      <motion.img
                        className="testiimage"
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
                          cursor: "pointer",
                          maxWidth: "90%",
                          width: "100%",
                          maxHeight: "400px",
                        }}
                      />
                    </motion.div>
                  )}
                  <div className="text-container">
                    <Typography
                      variant="body2"
                      style={{
                        textAlign: "left",
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "12.5px",
                        hyphens: "auto",
                        maxWidth: "100%",
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
