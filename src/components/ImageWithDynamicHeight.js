import React, { useState, useEffect } from "react";

const ImageWithDynamicHeight = ({ src, alt, onClick, isSelected }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const maxWidth = isSelected ? "100px" : "350px"; // Adjust the max width as needed
      const maxHeight = isSelected ? "400px" :"100%"; // Adjust the max height as needed

      if (aspectRatio > 1) {
        // Landscape image
        setImageWidth(maxWidth);
        setImageHeight(maxWidth / aspectRatio);
      } else {
        // Portrait image
        setImageWidth(maxHeight * aspectRatio);
        setImageHeight(maxHeight);
      }

      setIsLoaded(true);
    };
  }, [src, isSelected]);

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      {isLoaded && (
        <img
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default ImageWithDynamicHeight;
