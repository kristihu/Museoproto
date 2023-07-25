import axios from "axios";

// Fetch categories
export const fetchCategories = () => {
  return axios.get("http://localhost:3001/categories");
};

// Fetch subcategories for a given category
export const fetchSubcategories = (categoryId) => {
  return axios.get(`http://localhost:3001/subcategories/${categoryId}`);
};

// Fetch media for a given subcategory
export const fetchMedia = (subcategoryId) => {
  return axios.get(`http://localhost:3001/media/${subcategoryId}`);
};

// Fetch content text for a given subcategory
export const fetchContentText = (subcategoryId) => {
  return axios.get(`http://localhost:3001/contenttext/${subcategoryId}`);
};

// Create a new subcategory
export const createSubcategory = (subcategory, categoryId) => {
  const { name, selectedImage } = subcategory;

  const formData = new FormData();
  formData.append("image", selectedImage);

  return axios
    .post("http://localhost:3001/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const imagePath = response.data.imagePath;

      return axios.post(`http://localhost:3001/subcategories/`, {
        name,
        image_path: imagePath,
        category_id: categoryId,
      });
    });
};

// Update a subcategory
export const updateSubcategory = (subcategory, image) => {
  const { id, name } = subcategory;

  const formData = new FormData();
  formData.append("image", image);

  return axios
    .post("http://localhost:3001/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const imagePath = response.data.imagePath;

      return axios.put(`http://localhost:3001/subcategories/${id}`, {
        name,
        image_path: imagePath,
      });
    });
};

// Update media
export const updateMedia = (mediaId, formData) => {
  return axios.put(`http://localhost:3001/media/${mediaId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
//update content text
export const updateContentText = async (contenttextId, updatedText) => {
  return axios.put(
    `http://localhost:3001/contenttext/${contenttextId}`,
    { text: updatedText },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
//create content text
export const createContentText = (subcategoryId, text) => {
  return axios.post(
    `http://localhost:3001/contenttext/${subcategoryId}`,
    { text },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
// create media
export const createMedia = (subcategoryId, formData) => {
  console.log(subcategoryId, "HAHHEHEHHE");
  return axios.post(`http://localhost:3001/media/${subcategoryId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
