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
    vuosi,
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
        vuosi,
        image_path: imagePath,
        category_id: categoryId,
      });
    });
};

// Update a subcategory
export const updateSubcategory = (subcategory, image) => {
  const { id, name, name_en, name_sv, alateksti, alateksti_en, alateksti_sv, vuosi } =
    subcategory;

  const formData = new FormData();
  if (image) {
    // Append the new image only if it exists
    formData.append("image", image);
  }

  return axios
    .post("http://localhost:3001/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const imagePath = response.data.imagePath;

      // Only include image_path in the update if a new image was selected
      const updateData = {
        name,
        name_en,
        name_sv,
        alateksti,
        alateksti_en,
        alateksti_sv,
        vuosi,
      };

      if (imagePath) {
        updateData.image_path = imagePath;
      }

      return axios.put(`http://localhost:3001/subcategories/${id}`, updateData);
    });
};
export const updateSubcategoryWithImagePath = (subcategory, selectedImage) => {
  const { id, name, name_en, name_sv, alateksti, alateksti_en, alateksti_sv, vuosi } =
    subcategory;

  if (selectedImage) {
    // New image is picked, perform image upload
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

        return axios.put(`http://localhost:3001/subcategories/${id}`, {
          name,
          name_en,
          name_sv,
          alateksti,
          alateksti_en,
          alateksti_sv,
          vuosi,
          image_path: imagePath,
        });
      });
  } else {
    // No new image is picked, use the image_path from the input field
    return axios.put(`http://localhost:3001/subcategories/${id}`, {
      name,
      name_en,
      name_sv,
      alateksti,
      alateksti_en,
      alateksti_sv,
      vuosi,
      image_path: subcategory.image_path, // Use the existing image_path
    });
  }
};

// Update media
export const updateMedia = (mediaId, formData) => {
  return axios.put(`http://localhost:3001/media/${mediaId}`, formData);
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

// create content text
export const createContentText = (subcategoryId, text) => {
  const { text_en, text_sv } = text;
  return axios.post(
    `http://localhost:3001/contenttext/${subcategoryId}`,
    {
      text: text.text,
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

export const createLahteet = (formData) => {
  return axios.post(`http://localhost:3001/lahteet`, formData, {
    headers: { "Content-Type": "application/json" },
  });
};

// create media
export const createMedia = (subcategoryId, formData) => {
  console.log(formData, "HAHHEHEHHE");
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

export const deleteMedia = (subcategoryId, mediaId) => {
  return axios.delete(
    `http://localhost:3001/media/${subcategoryId}/${mediaId}`
  );
};

export const fetchLahteet = (subcategoryId) => {
  console.log(subcategoryId, "idddidididiidid");
  return axios.get(`http://localhost:3001/lahteet/${subcategoryId}`);
};

export const updateLahteet = (lahteetId, updatedLahteet) => {
  const { tekijat, esiintyjat, esiintyjat_en, esiintyjat_sv, lahteet, tekijat_sv } =
    updatedLahteet;

  return axios.put(
    `http://localhost:3001/lahteet/${lahteetId}`,
    {
      tekijat,
      esiintyjat,
      esiintyjat_en,
      esiintyjat_sv,
      lahteet,
      tekijat_sv,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
