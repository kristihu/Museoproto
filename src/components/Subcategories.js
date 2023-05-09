import React, { useEffect, useState } from "react";
import Content from "./Content";

const Subcategories = ({ clickedCategory, resetState }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/subcategories/${clickedCategory.id}`)
      .then((response) => response.json())
      .then((data) => {
        const subcategories = data.map((subcat) => ({
          id: subcat.id,
          image_path: subcat.image_path,
          name: subcat.name,
        }));
        setSubcategories(subcategories);
      })
      .catch((error) => console.log(error));
  }, [clickedCategory]);

  const handleSubcategoryClick = (id) => {
    console.log(id, "tyhmä");
    setCurrentSubcategory(id);
  };

  return (
    <div>
      {!currentSubcategory && (
        <div>
          {subcategories.map((subcat) => (
            <img
              src={subcat.image_path}
              alt={subcat.name}
              key={subcat.id}
              onClick={() => handleSubcategoryClick(subcat.id)}
            />
          ))}
        </div>
      )}
      {currentSubcategory && (
        <Content
          currentSubcategory={currentSubcategory}
          setCurrentSubcategory={setCurrentSubcategory}
          setSubcategories={setSubcategories}
          resetState={resetState}
        />
      )}
    </div>
  );
};

export default Subcategories;
