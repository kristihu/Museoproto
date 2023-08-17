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

  const filteredImages = images.filter((image) => image !== null);

  useEffect(() => {
    let interval = null;

    if (!togglePause) {
      interval = setInterval(() => {
        setPrevious(current);

        let nextImageIndex = (current + 1) % images.length;

        // Skip images with null image_path
        while (
          images[nextImageIndex] === null ||
          images[nextImageIndex].image_path === null
        ) {
          nextImageIndex = (nextImageIndex + 1) % images.length;
        }

        setCurrent(nextImageIndex);
      }, 6000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [current, images, togglePause]);

  useEffect(() => {
    if (clickedImageIndex !== null) {
      console.log(images, "images??");
      setPrevious(clickedImageIndex);
      setCurrent(clickedImageIndex);
    }
  }, [clickedImageIndex, images]);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence initial={false}>
        {previous !== null && (
          <motion.div
            key={`current-${current}`}
            variants={variants}
            initial="enter"
            exit="exit"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={`http://localhost:3001${images[previous]}`}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          </motion.div>
        )}
        <motion.div
          key={current}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={`http://localhost:3001${images[current]}`}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ImageCarousel;
