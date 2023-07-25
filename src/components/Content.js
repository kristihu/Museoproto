import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Typography, Box, Link } from "@mui/material";
import "./Content.css";

const imageVariants = {
  tap: { scale: 0.95 },
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
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
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
        component="p"
        gutterBottom
        sx={{
          marginTop: "15px",
          fontSize: "15px",
          fontFamily: "Montserrat",
          fontWeight: 400,
          "& .italic": {
            fontStyle: "italic",
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
                style={{ marginBottom: "-8px" }} // adjust this as needed
              />
            </React.Fragment>
          );
        })}
      </Typography>
    ));
  };

  if (showAuthors) {
    // Render the authors view here
    return (
      <div>
        <Typography variant="h3">Authors</Typography>
        {/* Add the authors content */}
        {/* Add the back button */}
      </div>
    );
  }
  if (!contenttext || contenttext.length === 0) {
    return <></>;
  }
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
              }}
            >
              Seitsemän veljestä
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
              width: "600px",
              marginRight: "280px",
              marginTop: "105px",
            }}
          >
            <img
              src={`http://localhost:3001${content[0].image_path}`}
              alt="Hero"
              style={{
                width: "100%",
                height: "400px",
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

          <Grid
            container
            direction="row"
            style={{
              height: "315px",
              overflowY: "hidden",
              marginTop: "80px",
              marginRight: "250px",
              marginLeft: "370px",
            }}
            flexWrap="wrap"
          >
            {content.slice(1).map((item, index) => (
              <Grid item sm={4} key={item.id}>
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
                      width: "300px",
                      height: "215px",
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
                      selectedImage === index + 1 ? imageVariants.selected : {}
                    }
                    transition={{ duration: 0.1 }}
                    style={{ width: "300px", height: "215px" }}
                  />
                )}
                <Typography variant="body2" gutterBottom>
                  {item.imagetext}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.imagetextbold}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Content;
