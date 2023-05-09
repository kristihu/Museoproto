import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Imagecarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
  }, [images]);

  return (
    <Carousel
      selectedItem={currentSlide}
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={false}
      interval={3000}
      transitionTime={1000}
      swipeable={false}
      stopOnHover={false}
    >
      {images.map((image, index) => (
        <div key={index} style={{ height: "100vh", overflow: "hidden" }}>
          <img
            src={image}
            alt=""
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Imagecarousel;
