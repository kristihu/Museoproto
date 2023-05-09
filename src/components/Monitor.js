import React from "react";
import Gridmain from "./Gridmain";
import Subcategories from "./Subcategories";
import Content from "./Content";

const Monitor = ({
  categories,
  handleClick,
  clickedCategory,
  clickedSubcategory,
  resetState,
}) => {
  return (
    <>
      {clickedSubcategory ? (
        <Content subcategory={clickedSubcategory} />
      ) : clickedCategory ? (
        <Subcategories
          clickedCategory={clickedCategory}
          resetState={resetState}
        />
      ) : (
        <Gridmain images={categories} handleClick={handleClick} />
      )}
    </>
  );
};

export default Monitor;
