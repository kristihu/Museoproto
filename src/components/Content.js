import React, { useEffect, useState } from "react";
import "./Content.css";
import Imagecarousel from "./Imagecarousel";

const Content = ({ currentSubcategory, resetState }) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleReturn = () => {
    resetState();
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/content/${currentSubcategory}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data);
        setIsLoading(false);
        setShowCarousel(!data.some((item) => item.video_path));
      })
      .catch((error) => console.log(error));
  }, [currentSubcategory]);

  const test = (index) => {
    setClickedImageIndex(index);
    setShowCarousel(true);
  };

  const renderContentItem = (item, index) => (
    <div key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.text}</p>
      <img
        onClick={() => test(index)}
        className="test"
        src={item.image_path}
        alt={item.name}
      />
    </div>
  );

  const renderVideoPlayer = () => {
    const videoPath = content.find((item) => item.video_path)?.video_path;
    return (
      videoPath && (
        <video src={videoPath} autoPlay loop muted style={{ width: "100%" }} />
      )
    );
  };

  const renderImageCarousel = () => {
    const imagePaths = content.map((item) => item.image_path);
    return (
      <Imagecarousel
        images={imagePaths}
        clickedImageIndex={clickedImageIndex}
      />
    );
  };

  return (
    <div className="container">
      <div className="first">
        <button onClick={handleReturn}>Home</button>
        {content.map((item, index) => renderContentItem(item, index))}
      </div>
      <div className="second">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>{showCarousel ? renderImageCarousel() : renderVideoPlayer()}</>
        )}
      </div>
    </div>
  );
};

export default Content;
