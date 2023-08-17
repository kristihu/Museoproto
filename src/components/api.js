import axios from "axios";

// Fetch categories
export const fetchCategories = () => {
  return axios.get("http://localhost:3001/categories");
};

// Fetch subcategories for a given category
export const fetchSubcategories = (categoryId, language) => {
  return axios.get(
    `http://localhost:3001/subcategories/${categoryId}?language=${language}`
  );
};

export const fetchSubcategoryDetails = (subcategoryId) => {
  return axios.get(`http://localhost:3001/subcategory/${subcategoryId}`);
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
  const {
    name,
    name_en,
    name_sv,
    alateksti,
    alateksti_en,
    alateksti_sv,
    selectedImage,
  } = subcategory;

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
        name_en,
        name_sv,
        alateksti,
        alateksti_en,
        alateksti_sv,
        image_path: imagePath,
        category_id: categoryId,
      });
    });
};

// Update a subcategory
export const updateSubcategory = (subcategory, image) => {
  const { id, name, name_en, name_sv, alateksti, alateksti_en, alateksti_sv } =
    subcategory;

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
        name_en,
        name_sv,
        alateksti,
        alateksti_en,
        alateksti_sv,
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
  const { text, text_en, text_sv } = updatedText;
  return axios.put(
    `http://localhost:3001/contenttext/${contenttextId}`,
    {
      text,
      text_en,
      text_sv,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

//create content text
// create content text
export const createContentText = (subcategoryId, text) => {
  const { text_en, text_sv } = text; // Extract English and Swedish texts
  return axios.post(
    `http://localhost:3001/contenttext/${subcategoryId}`,
    {
      text: text.text, // Set the Finnish text
      text_en, // Set the English text
      text_sv, // Set the Swedish text
    },
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
//delete subcategory and it's media
export const deleteSubcategory = (subcategoryId) => {
  return axios.delete(`http://localhost:3001/subcategories/${subcategoryId}`);
};
