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
          fontSize: "15px",
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

  if (showAuthors) {
    return (
      <div
        style={{ marginLeft: "150px", marginRight: "60px", marginTop: "100px" }}
      >
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
              {authors && formatTextt(authors[0].lahteet)}
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
      <Grid container style={{ marginLeft: "30px", marginTop: "-25px" }}>
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
                height: "800px",
                overflow: "auto",
                width: "500px",
                hyphens: "auto",
                wordWrap: "break-word", // Add this line to allow word wrapping
                maxWidth: "100%", // Add this line to limit text width to container width
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
              marginRight: "340px",
              marginTop: isLongTitle ? "190px" : "80px",
              zIndex: "30",
              marginLeft: "4px",
            }}
          >
            <img
              src={`http://localhost:3001${content[0].image_path}`}
              alt="Hero"
              style={{
                width: "1100px",
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

          <ImageList
            rows={1}
            gap={50}
            sx={{
              marginBottom: "50px",
              marginTop: "110px",
              marginLeft: "50px",
            }}
          >
            {content.slice(1).map((item, index) => (
              <ImageListItem
                key={item.id}
                style={{
                  maxWidth: "650px",
                  maxHeight: "400px",
                  marginLeft: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
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
                        maxWidth: "100%",
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
                  <motion.div
                    whileTap={imageVariants.tap}
                    style={{ maxWidth: "80%", maxHeight: "100%" }}
                  >
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
                  </motion.div>
                )}

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
    );
  } else {
    return (
      <Grid
        container
        direction="column"
        style={{ height: "100vh", overflow: "hidden", marginTop: "50px" }}
      >
        <Grid
          item
          container
          direction="row"
          style={{ overflowY: "hidden", marginLeft: "70px" }}
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
                  height: "800px",
                  overflow: "auto",
                  width: "500px",
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
                  }}
                >
                  {lahdeTitles[0]}
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
                  {lahdeTitles[1]}
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
              marginLeft: "-40px",
            }}
          >
            {/* Hero Image */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: isLongTitle ? "105px" : "50px",
              }}
            >
              <img
                src={`http://localhost:3001${content[0].image_path}`}
                alt="Hero"
                style={{
                  width: "600px",
                  height: "900px",
                  ...(selectedImage === 0 ? imageVariants.selected : {}),
                }}
                onClick={() => handleImageClick(0)}
                whiletap={imageVariants.tap}
                transition={{ duration: 0.1 }}
              />

              <Box
                sx={{
                  maxWidth: "500px",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
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
            </Box>

            {content.length === 2 ? (
              <div>
                <img
                  src={`http://localhost:3001${content[1].image_path}`}
                  alt="Hero"
                  style={{
                    marginTop: "105px",
                    marginLeft: "40px",
                    width: "500px",
                    height: "800px",
                    ...(selectedImage === 0 ? imageVariants.selected : {}),
                  }}
                  onClick={() => handleImageClick(1)}
                  whiletap={imageVariants.tap}
                  transition={{ duration: 0.1 }}
                />
                <Box
                  sx={{
                    maxWidth: "500px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "12.5px",
                    }}
                    gutterBottom
                  >
                    {content[1].imagetext}
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
                    {content[1].imagetextbold}
                  </Typography>
                </Box>
              </div>
            ) : (
              <ImageList
                cols={1}
                gap={50}
                sx={{ marginBottom: "50px", marginTop: "110px" }}
              >
                {content.slice(1).map((item, index) => (
                  <ImageListItem
                    className={
                      item.height > item.width
                        ? "image-with-more-height"
                        : "image-with-more-width"
                    }
                    key={item.id}
                    style={{
                      maxWidth: "400px",
                      maxHeight: "500px",
                      marginLeft: "100px",
                      display: "flex",
                      flexDirection: "column",

                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "left",
                        overflow: "hidden",
                        position: "relative",
                        paddingBottom: `${(item.height / item.width) * 100}%`,
                      }}
                    >
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
                              maxWidth: "100%",
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
                            {/* You can customize the play button icon here */}
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "left",
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: "12.5px",
                          marginTop: "5px",
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
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Content;
