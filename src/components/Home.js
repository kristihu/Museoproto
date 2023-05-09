import React, { useState } from "react";

import "./App.css";
import Monitor from "./Monitor";

const Home = ({ categories }) => {
  const [clickedCategory, setClickedCategory] = useState(null);
  const [clickedSubcategory, setClickedSubcategory] = useState(null);

  const resetState = () => {
    setClickedCategory(null);
    setClickedSubcategory(null);
  };

  const handleCategoryClick = (id) => {
    console.log("clicked imaasddge", id);
    // plus 1 to get the right category id
    const categoryId = id + 1;
    const clicked = categories.find((cat) => cat.id === categoryId);
    console.log(clicked.id, "category");
    setClickedCategory(clicked);
    setClickedSubcategory(null);
  };

  return (
    <div className="container">
      <div className="first">
        <Monitor
          categories={categories}
          handleClick={handleCategoryClick}
          clickedCategory={clickedCategory}
          clickedSubcategory={clickedSubcategory}
          resetState={resetState}
        />
      </div>
      <div className="second">
        <Monitor
          categories={categories}
          handleClick={handleCategoryClick}
          clickedCategory={clickedCategory}
          clickedSubcategory={clickedSubcategory}
          resetState={resetState}
        />
      </div>
    </div>
  );
};

export default Home;
