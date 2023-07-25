import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import Content from "./components/Content";
import Imagecarousel from "./components/Imagecarousel";

import "./App.css";
import Sidebar from "./components/Sidebar";

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = ({ socket }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [lastCategoryId, setLastCategoryId] = useState(null);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [carouselMode, setCarouselMode] = useState(false);
  const [togglePause, setTogglePause] = useState(false);
  const [contenttext, setContenttext] = useState(null);
  const [showAuthors, setShowAuthors] = useState(false);

  const query = useQuery();
  const isProjector = query.get("projector") === "true";

  useEffect(() => {
    if (!socket) return;

    socket.emit("initialFetch");

    socket.on("displayCategories", (data) => {
      setCategories(data);
      setSubcategories([]);
      setContenttext([]);
    });

    socket.on("displaySubcategories", (data) => {
      setSubcategories(data);
      setContent([]);
      setCategories([]);
      setVideo(null);
      setImages([]);
    });

    socket.on("displaySubcategoriesOnBack", (data) => {
      setTogglePause(false);
      setSubcategories(data);
      setCarouselMode(false);
      setClickedImageIndex(null);
    });

    socket.on("displayContent", (data) => {
      setSubcategories([]);
      setContent(data.media);
      setContenttext(data.contenttext);
      if (isProjector) {
        const videoItem = data.media.find((item) => item.video_path);
        if (videoItem) {
          setCarouselMode(false);
          setVideo(videoItem.video_path);
        } else if (data.media.some((item) => item.image_path)) {
          setImages(data.media.map((item) => item.image_path));
          setCarouselMode(true);
        }
      }
    });

    socket.on("displayImageAtIndex", ({ index, images }) => {
      setClickedImageIndex(index);
      if (isProjector) {
        const imagePaths = images.map((image) => image.image_path);
        setImages(imagePaths);
        setCarouselMode(true);
      }
    });

    socket.on("playVideo", (videoPath) => {
      console.log(videoPath, "VCIDEO");
      setVideo(videoPath);
      setCarouselMode(false);
    });

    socket.on("resetProjector", () => {
      setTogglePause(false);
      setCarouselMode(false);
      setClickedImageIndex(null);
    });

    socket.on("displayCategoriesOnHome", (data) => {
      setCategories(data);
      setSubcategories([]);
      setContent([]);
      setVideo(null);
      setImages([]);
      setCarouselMode(false);
      setClickedImageIndex(null);
      setContenttext(null);
    });

    socket.on("carouselToggled", () => {
      setTogglePause((prevState) => !prevState);
    });

    return () => {
      socket.off("displayCategories");
      socket.off("displaySubcategories");
      socket.off("displaySubcategoriesOnBack");
      socket.off("displayContent");
      socket.off("displayImageAtIndex");
      socket.off("playVideo");
      socket.off("resetProjector");
      socket.off("displayCategoriesOnHome");
      socket.off("carouselToggled");
    };
  }, [socket, isProjector]);
  const handleCategoryClick = (categoryId) => {
    setLastCategoryId(categoryId);
    socket.emit("categoryClicked", categoryId);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    socket.emit("subcategoryClicked", subcategoryId);
    socket.emit("subcategoryChanged");
  };

  const handleBackClick = () => {
    if (showAuthors) {
      setShowAuthors(false);
    } else if (content.length > 0) {
      socket.emit("categoryClicked", lastCategoryId);
      socket.emit("backClicked", lastCategoryId);
    } else if (subcategories.length > 0) {
      socket.emit("initialFetch");
    }
  };

  const handleHomeClick = () => {
    setShowAuthors(false);
    socket.emit("initialFetch");
    socket.emit("homeClicked");
  };

  const handleImageClick = (index) => {
    const selectedItem = content[index];

    if (isProjector) {
      if (selectedItem.video_path) {
        socket.emit("playVideo", selectedItem.video_path);
      } else {
        socket.emit("imageClicked", content[0]?.subcategory_id, index);
      }
    } else {
      socket.emit("imageClicked", content[0]?.subcategory_id, index);
      setCarouselMode(true);
    }
  };

  const handleToggleClick = () => {
    socket.emit("toggleCarousel");
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
  };

  if (isProjector && carouselMode) {
    return (
      <div className="App">
        <Imagecarousel
          images={images}
          clickedImageIndex={clickedImageIndex}
          togglePause={togglePause}
        />
      </div>
    );
  }

  if (isProjector && video && !carouselMode) {
    const videoUrl = `http://localhost:3001${video}`;
    return (
      <div className="App">
        <video
          width="100%"
          height="100%"
          controls
          autoPlay
          onCanPlay={(e) => e.target.play()}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="disable-tap-highlight">
      <div
        className={`App ${isProjector ? "projector" : "non-projector"}`}
        /*  onTouchMove={handleTouchMove}
        onContextMenu={(e) => e.preventDefault()} // Kaikki klikkaustoiminnot pois
        onTouchStart={(e) => e.preventDefault()}
        onDoubleClick={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onSelect={(e) => e.preventDefault()} */
      >
        {!isProjector && (
          <div className="sidebar">
            <Sidebar
              handleBackClick={handleBackClick}
              handleHomeClick={handleHomeClick}
            />
          </div>
        )}
        <div className="content">
          {categories.length > 0 && (
            <Categories
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          )}
          {subcategories.length > 0 && (
            <Subcategories
              subcategories={subcategories}
              onSubcategoryClick={handleSubcategoryClick}
            />
          )}
          {content.length > 0 && (
            <>
              <Content
                content={content}
                contenttext={contenttext}
                onImageClick={handleImageClick}
                handleToggleClick={handleToggleClick}
                showAuthors={showAuthors}
                setShowAuthors={setShowAuthors}
                socket={socket}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
