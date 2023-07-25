import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: {
    opacity: 0,
    transition: { duration: 6 },
  },
  center: {
    zIndex: 1,
    opacity: 1,
    transition: { duration: 6 },
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    transition: { duration: 6 },
  },
};

function ImageCarousel({ images, clickedImageIndex, togglePause }) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    let interval = null;
    if (!togglePause) {
      interval = setInterval(() => {
        setPrevious(current);
        setCurrent((current + 1) % images.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [current, images.length, togglePause]);

  useEffect(() => {
    if (clickedImageIndex !== null) {
      setPrevious(current);
      setCurrent(clickedImageIndex);
    }
  }, [clickedImageIndex, current]);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence initial={false}>
        {previous !== null && (
          <motion.img
            key={previous.id}
            src={`http://localhost:3001${images[previous]}`}
            variants={variants}
            initial="enter"
            exit="exit"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
        <motion.img
          key={current}
          src={`http://localhost:3001${images[current]}`}
          variants={variants}
          initial="enter"
          animate="center"
          transition={{
            opacity: { duration: 1 },
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </AnimatePresence>
    </div>
  );
}

export default ImageCarousel;
