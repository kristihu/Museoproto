import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import Content from "./components/Content";
import Imagecarousel from "./components/Imagecarousel";
import { useLanguage } from "./components/LanguageContext";

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
  const [authors, setAuthors] = useState([]);
  const [subTitle, setSubTitle] = useState();
  const [subTitle2, setSubTitle2] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedSubTitle, setSelectedSubTitle] = useState("");
  const [testTitle, setTestTitle] = useState("");

  const query = useQuery();
  const isProjector = query.get("projector") === "true";
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    if (!socket) return;

    socket.emit("initialFetch", selectedLanguage);

    socket.on("displayCategories", (data) => {
      setCategories(data);

      setSubcategories([]);
      setContenttext([]);
      setAuthors([]);
      setShowAuthors(false);
    });

    socket.on("displaySubcategories", (data) => {
      const { subcategories, categoryInfo } = data;
      console.log("Subcategories:", subcategories);
      console.log("Category Info:", categoryInfo);
      setSubcategories(subcategories);
      setTestTitle(categoryInfo[0].name);
      setContent([]);
      setCategories([]);
      setVideo(null);
      setImages([]);
    });

    socket.on("displaySubcategoriesOnBack", (data) => {
      console.log(data, "BACKEKDEKDK");
      const { subcategories, categoryInfo } = data;
      setTogglePause(false);
      setSubcategories(subcategories);
      setVideo(null);
      setTestTitle(categoryInfo[0].name);
      setContent([]);
      setCarouselMode(false);
      setClickedImageIndex(null);
    });

    socket.on("displayTitle", (title) => {
      setSelectedTitle(title);
    });
    socket.on("displaySubtitle", (subtitle) => {
      setSelectedSubTitle(subtitle);
    });

    socket.on("displayContent", (data) => {
      console.log(data, "datatata");
      setSubcategories([]);
      setContent(data.media);
      setAuthors(data.lahteet);
      setContenttext(data.contenttext);
      setSubTitle(data.subTitle);
      setSubTitle2(data.subTitle2);

      console.log(data.subTitle, "auth");
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
        console.log(imagePaths, "imagepaths");
        setImages(imagePaths);
        setCarouselMode(true);
      }
    });

    socket.on("playVideo", (videoPath) => {
      console.log(videoPath, "VCIDEO");
      setVideo(videoPath);
      setCarouselMode(false);
    });
    socket.on("languageIconClicked", () => {
      setTogglePause(false);
      setCarouselMode(false);
      setClickedImageIndex(null);
      setVideo(null);
    });
    socket.on("resetProjector", () => {
      setTogglePause(false);
      setCarouselMode(false);
      setClickedImageIndex(null);
      setVideo(null);
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
      socket.off("displaySubtitle");
      socket.off("displayTitle");
    };
  }, [socket, isProjector, selectedLanguage]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categories[categoryId - 1].name);
    setLastCategoryId(categoryId);
    socket.emit("categoryClicked", {
      categoryId: categoryId,
      selectedLanguage: selectedLanguage,
    });
  };

  const handlePlayToggle = () => {
    setTogglePause((prevState) => !prevState);
    socket.emit("toggleCarousel");
  };

  const handleSubcategoryClick = (subcategoryId) => {
    socket.emit("subcategoryClicked", { subcategoryId, selectedLanguage });
    socket.emit("subcategoryChanged");
  };
  const handleBackClick = () => {
    if (showAuthors) {
      setShowAuthors(false);
    } else if (content.length > 0) {
      socket.emit("categoryClicked", lastCategoryId);
      socket.emit("backClicked", {
        categoryId: lastCategoryId,
        selectedLanguage,
      });
    } else if (subcategories.length > 0) {
      socket.emit("backClicked", selectedLanguage);
      socket.emit("initialFetch", selectedLanguage);
    }
  };

  const handleHomeClick = () => {
    setShowAuthors(false);
    socket.emit("initialFetch", selectedLanguage);
    socket.emit("homeClicked", selectedLanguage);
  };

  const handleImageClick = (index) => {
    const selectedItem = content[index];
    console.log(selectedItem, "asdasdasdasdasdasdasdasd");
    if (isProjector) {
      if (selectedItem.video_path) {
        socket.emit("playVideo", selectedItem.video_path);
      } else {
        const imagePaths = images.map((item) => item.image_path);

        setImages(imagePaths);
        setCarouselMode(true);
      }
    } else {
      socket.emit("imageClicked", content[0]?.subcategory_id, index);
      handleToggleClick();
      setCarouselMode(true);
    }
  };
  const handleResetProjector = () => {
    setTogglePause(false);
    setCarouselMode(false);
    setClickedImageIndex(null);
  };
  const handleToggleClick = () => {
    socket.emit("toggleCarousel", togglePause);
  };
  //const handleTouchMove = (event) => {
  //  event.preventDefault();
  // };

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
              handlePlayToggle={handlePlayToggle}
              socket={socket}
              handleResetProjector={handleResetProjector}
            />
          </div>
        )}
        <div className="content">
          {categories.length > 0 && (
            <Categories
              selectedTitle={selectedTitle}
              selectedSubTitle={selectedSubTitle}
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          )}
          {subcategories.length > 0 && (
            <Subcategories
              selectedCategory={selectedCategory}
              categories={categories}
              subcategories={subcategories}
              onSubcategoryClick={handleSubcategoryClick}
              selectedLanguage={selectedLanguage}
              testTitle={testTitle}
            />
          )}
          {content.length > 0 && (
            <>
              <Content
                content={content}
                contenttext={contenttext}
                onImageClick={handleImageClick}
                clickedImageIndex={clickedImageIndex}
                handleToggleClick={handleToggleClick}
                showAuthors={showAuthors}
                setShowAuthors={setShowAuthors}
                authors={authors}
                socket={socket}
                subTitle={subTitle}
                subTitle2={subTitle2}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
