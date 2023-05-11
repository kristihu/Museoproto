import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Imagecarousel = ({ images, clickedImageIndex }) => {
  return (
    <Carousel
      autoPlay={clickedImageIndex === null}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={false}
      interval={3000}
      transitionTime={1000}
      swipeable={false}
      stopOnHover={false}
      selectedItem={clickedImageIndex || 0}
    >
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "black",
          }}
        >
          <img
            src={image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Imagecarousel;
