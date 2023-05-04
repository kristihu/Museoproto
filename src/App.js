import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import Gridmain from "./components/Gridmain";

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoFile, setVideoFile] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //hae tietokannasta alkuvalikon kuvat ja otsikot
    fetch("http://localhost:3001/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleImageClick = (id) => {
    const image = images.find((img) => img.id === id);
    if (image) {
      console.log(image, "image");
      setVideoFile(image.video);
      setIsPlaying(true);
    }
  };

  const images = [
    { id: 0, image: "./images/Capture.png", video: "./images/test.mp4" },
    { id: 1, image: "./images/Capture2.png", video: "./images/test2.mp4" },
    { id: 2, image: "./images/Capture3.png", video: "./images/test3.mp4" },
    { id: 3, image: "./images/Capture4.png", video: "./images/test.mp4" },
    { id: 4, image: "./images/Capture5.png", video: "./images/test2.mp4" },
  ];

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoTime(0);
  };

  return (
    <div className="container">
      <div className="first">
        <Gridmain images={images} handleClick={handleImageClick} />
      </div>
      <div className="second">
        <Gridmain variant="contained" images={images} />

        <video
          ref={videoRef}
          src={videoFile}
          controls
          style={{
            display: isPlaying ? "block" : "none",
          }}
          onEnded={handleVideoEnd}
          currenttime={videoTime}
        ></video>
      </div>
      <div></div>
    </div>
  );
};

export default App;
