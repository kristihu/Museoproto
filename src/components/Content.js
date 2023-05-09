import React, { useEffect, useState } from "react";
import "./Content.css";
import Imagecarousel from "./Imagecarousel";

const Content = ({ currentSubcategory, resetState }) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      })
      .catch((error) => console.log(error));
  }, [currentSubcategory]);

  const renderContentItem = (item, showVideo) => (
    <div key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.text}</p>
      {showVideo && item.video_path && (
        <video src={item.video_path} autoPlay loop muted />
      )}
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
    return <Imagecarousel images={imagePaths} />;
  };

  return (
    <div className="container">
      <div className="first">
        <button onClick={handleReturn}>Return to Categories</button>
        {content.map((item) => renderContentItem(item, false))}
      </div>
      <div className="second">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {renderVideoPlayer()}
            {renderImageCarousel()}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
