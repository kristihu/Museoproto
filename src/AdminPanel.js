import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Modal,
  TextField,
  Box,
} from "@mui/material";

import {
  fetchCategories,
  fetchSubcategories,
  fetchMedia,
  fetchContentText,
  createSubcategory,
  updateSubcategory,
  updateMedia,
  updateContentText,
  createMedia,
  createContentText,
  deleteSubcategory,
  fetchSubcategoryDetails,
  deleteMedia,
  updateSubcategoryWithImagePath,
} from "./components/api";
import LahteetModal from "./components/LahteetModal";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [lahteetModal, setLahteetModal] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState({
    id: null,
    name: "",
    name_en: "",
    name_sv: "",
    alateksti: "",
    alateksti_en: "",
    alateksti_sv: "",
    image_path: "",
    category_id: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMediaImage, setSelectedMediaImage] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    name_en: "",
    name_sv: "",
    alateksti: "",
    alateksti_en: "",
    alateksti_sv: "",
    imagePath: "",
    vuosi: "",
    selectedImage: null,
  });
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedContentText, setSelectedContentText] = useState([]);

  const [updatedContentText, setUpdatedContentText] = useState({
    text: "",
    text_en: "",
    text_sv: "",
  });
  const [addMediaModal, setAddMediaModal] = useState(false);
  const [newMedia, setNewMedia] = useState({
    imagetext: "",
    imagetextbold: "",
    imagetext_en: "",
    imagetext_sv: "",
    imagetextbold_en: "",
    imagetextbold_sv: "",

    selectedMediaFile: null,
    mediaType: "image",
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [formFields, setFormFields] = useState({
    imagetext: "",
    imagetextbold: "",
    imagetext_en: "",
    imagetext_sv: "",
    imagetextbold_en: "",
    imagetextbold_sv: "",
    selectedMediaFile: null,
    mediaType: "image",
  });

  useEffect(() => {
    fetchCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory)
        .then((response) => setSubcategories(response.data))
        .catch((error) => {
          console.error("Error fetching subcategories: ", error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedContentText.length > 0) {
      setUpdatedContentText({
        text: selectedContentText[0].text,
        text_en: selectedContentText[0].text_en,
        text_sv: selectedContentText[0].text_sv,
      });
    }
  }, [selectedContentText]);

  const handleEdit = (subcategoryId) => {
    fetchSubcategoryDetails(subcategoryId)
      .then((response) => {
        const subcategoryDetails = response.data[0];
        console.log(subcategoryDetails.name, "data?");

        setEditSubcategory({
          id: subcategoryId,
          name: subcategoryDetails.name,
          name_en: subcategoryDetails.name_en,
          name_sv: subcategoryDetails.name_sv,
          alateksti: subcategoryDetails.alateksti,
          alateksti_en: subcategoryDetails.alateksti_en,
          alateksti_sv: subcategoryDetails.alateksti_sv,
          image_path: subcategoryDetails.image_path,
          category_id: subcategoryDetails.category_id,
        });

        setEditModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching subcategory details:", error);
      });
  };

  const handleEditContent = (subcategory) => {
    setSelectedSubcategory(subcategory.id);
    Promise.all([fetchMedia(subcategory.id), fetchContentText(subcategory.id)])
      .then(([mediaResponse, contentResponse]) => {
        const media = mediaResponse.data;
        const contentText = contentResponse.data;

        setSelectedMedia(media);
        setSelectedContentText(contentText);

        console.log(media, "media");
        const initialFormFields = {};
        media.forEach((mediaItem) => {
          initialFormFields[mediaItem.id] = {
            imagetext: mediaItem.imagetext || "",
            imagetextbold: mediaItem.imagetextbold || "",
            imagetext_en: mediaItem.imagetext_en || "",
            imagetext_sv: mediaItem.imagetext_sv || "",
            imagetextbold_en: mediaItem.imagetextbold_en || "",
            imagetextbold_sv: mediaItem.imagetextbold_sv || "",
            image_path: mediaItem.image_path || "",
            video_path: mediaItem.video_path || "",
          };
        });

        setFormFields(initialFormFields);
        setMediaModalOpen(true);
      })
      .catch((error) => {
        console.error(
          `Error fetching media and content text for subcategory ${subcategory.id}: `,
          error
        );
      });
  };

  const handleSaveEditContentText = (id) => {
    const updatedText = {
      text: updatedContentText.text,
      text_en: updatedContentText.text_en,
      text_sv: updatedContentText.text_sv,
    };

    if (selectedContentText.length === 0) {
      createContentText(id, updatedText)
        .then((response) => {
          setSelectedContentText([response.data]);
          setUpdatedContentText({
            text: "",
            text_en: "",
            text_sv: "",
          });
        })
        .catch((error) => {
          console.error("Error creating content text: ", error);
        });
    } else {
      updateContentText(id, updatedText)
        .then(() => {
          console.log(updatedText, "tekstiuus");
          fetchContentText(id)
            .then((response) => setSelectedContentText([response.data]))
            .catch((error) => {
              console.error("Error fetching content text: ", error);
            });

          setUpdatedContentText({
            text: "",
            text_en: "",
            text_sv: "",
          });
          window.alert("Leipätekstit tallennettu onnistuneesti!");
        })
        .catch((error) => {
          console.error("Error updating content text: ", error);
        });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleMediaImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedMediaImage(file);
  };

  const handleNewImageChange = (event) => {
    const file = event.target.files[0];
    setNewSubcategory((prevSubcategory) => ({
      ...prevSubcategory,
      selectedImage: file,
      imagePath: file ? `/images/${file.name}` : "",
    }));
  };

  const handleCreateSubcategory = () => {
    createSubcategory(newSubcategory, selectedCategory)
      .then((response) => {
        setSubcategories((prevState) => [...prevState, response.data]);
        setNewSubcategory({
          name: "",
          name_en: "",
          name_sv: "",
          alateksti: "",
          alateksti_en: "",
          alateksti_sv: "",
          vuosi: "",
          selectedImage: null,
        });
      })
      .catch((error) => {
        console.error("Error creating subcategory: ", error);
      });
  };

  const handleSaveEdit = () => {
    // Check if a new image is picked
    if (selectedImage) {
      // New image is picked, perform image upload
      updateSubcategory(editSubcategory, selectedImage)
        .then((response) => {
          setSubcategories((prevState) =>
            prevState.map((subcategory) =>
              subcategory.id === editSubcategory.id
                ? {
                    ...subcategory,
                    image_path: response.data.imagePath,
                    name: editSubcategory.name,
                  }
                : subcategory
            )
          );
          setEditModalOpen(false);
          setSelectedImage(null);
        })
        .catch((error) => {
          console.error("Error updating subcategory: ", error);
        });
    } else {
      updateSubcategoryWithImagePath(editSubcategory)
        .then((response) => {
          setSubcategories((prevState) =>
            prevState.map((subcategory) =>
              subcategory.id === editSubcategory.id
                ? {
                    ...subcategory,
                    name: editSubcategory.name,
                  }
                : subcategory
            )
          );
          setEditModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating subcategory: ", error);
        });
    }
  };

  const handleDeleteMedia = (subcategoryId, mediaId) => {
    console.log("Deleting media:", subcategoryId, mediaId);

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this media?"
    );

    if (shouldDelete) {
      deleteMedia(subcategoryId, mediaId)
        .then(() => {
          console.log("Media deleted successfully:", mediaId);
          setSelectedMedia((prevState) =>
            prevState.filter((media) => media.id !== mediaId)
          );
        })
        .catch((error) => {
          console.error("Error deleting media:", error);
        });
    }
  };

  const handleImageTextChange = (event, mediaId) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [mediaId]: {
        ...prevFields[mediaId],
        [name]: value,
      },
    }));
  };

  const handleAddMedia = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setAddMediaModal(true);
  };

  const handleCloseLahteetModal = () => {
    setLahteetModal(false);
  };

  const handleCreateMedia = () => {
    const formData = new FormData();
    formData.append("file", newMedia.selectedMediaFile);
    formData.append("imagetext", newMedia.imagetext);
    formData.append("imagetextbold", newMedia.imagetextbold);
    formData.append("imagetext_en", newMedia.imagetext_en);
    formData.append("imagetext_sv", newMedia.imagetext_sv);
    formData.append("imagetextbold_en", newMedia.imagetextbold_en);
    formData.append("imagetextbold_sv", newMedia.imagetextbold_sv);
    formData.append("type", newMedia.mediaType);

    createMedia(selectedSubcategory.id, formData)
      .then((response) => {
        setSelectedMedia((prevState) => [...prevState, response.data]);
        setNewMedia({
          imagetext: "",
          imagetextbold: "",
          imagetext_en: "",
          imagetext_sv: "",
          imagetextbold_en: "",
          imagetextbold_sv: "",
          selectedMediaFile: null,
          mediaType: "image",
        });
        setAddMediaModal(false);
      })
      .catch((error) => {
        console.error("Error creating media: ", error);
      });
  };

  const handleAddMediaChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setNewMedia((prevMedia) => ({
        ...prevMedia,
        selectedMediaFile: files[0],
      }));
    } else {
      setNewMedia((prevMedia) => ({
        ...prevMedia,
        [name]: value,
      }));
    }
  };

  const handleSaveEditMedia = (mediaId, index) => {
    const updatedMedia = [...selectedMedia];
    const media = updatedMedia[index];
    const formData = new FormData();

    formData.append("imagetext", formFields[media.id]?.imagetext);
    formData.append("imagetextbold", formFields[media.id]?.imagetextbold);
    formData.append("imagetext_en", formFields[media.id]?.imagetext_en);
    formData.append("imagetext_sv", formFields[media.id]?.imagetext_sv);
    formData.append("imagetextbold_en", formFields[media.id]?.imagetextbold_en);
    formData.append("imagetextbold_sv", formFields[media.id]?.imagetextbold_sv);

    const selectedMediaType = media.video_path ? "video" : "image";

    if (selectedMediaType === "image") {
      if (selectedMediaImage) {
        formData.append("file", selectedMediaImage);
      } else {
        formData.append("image_path", formFields[media.id]?.image_path);
      }
    } else if (selectedMediaType === "video") {
      if (selectedMediaImage) {
        formData.append("file", selectedMediaImage);
      } else {
        formData.append("video_path", formFields[media.id]?.video_path);
      }
    }

    updateMedia(mediaId, formData)
      .then((response) => {
        const updatedMediaData = response.data;
        media.image_path = updatedMediaData.image_path;
        media.video_path = updatedMediaData.video_path;
        setSelectedMedia(updatedMedia);
        window.alert("Media tallennettu onnistuneesti!");
      })
      .catch((error) => {
        console.error("Error updating media: ", error);
      });
  };

  const handleDeleteSubcategory = (subcategoryId) => {
    console.log(subcategoryId, "IDIDIDIIDIDI");
    deleteSubcategory(subcategoryId)
      .then(() => {
        setSubcategories((prevState) =>
          prevState.filter((subcategory) => subcategory.id !== subcategoryId)
        );

        setSelectedMedia((prevState) =>
          prevState.filter((media) => media.subcategory_id !== subcategoryId)
        );
      })
      .catch((error) => {
        console.error("Error deleting subcategory: ", error);
      });
  };

  const handleDelete = (subcategoryId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this subcategory and its related media?"
    );

    if (shouldDelete) {
      handleDeleteSubcategory(subcategoryId);
    }
  };

  const handleLahteet = (subcategoryId) => {
    console.log(subcategoryId.id, "eipä ollu");
    setSelectedSubcategory(subcategoryId);
    setLahteetModal(true);
  };

  return (
    <div
      className="admin-panel"
      style={{ maxHeight: "90vh", overflowY: "auto", overflowX: "auto" }}
    >
      <Select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>

      <div className="create-subcategory-section">
        <h2>Lisää uusi teos</h2>
        <TextField
          label="Nimi"
          value={newSubcategory.name}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              name: e.target.value,
            }))
          }
        />
        <TextField
          label="Nimi eng"
          value={newSubcategory.name_en}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              name_en: e.target.value,
            }))
          }
        />
        <TextField
          label="Nimi swe"
          value={newSubcategory.name_sv}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              name_sv: e.target.value,
            }))
          }
        />
        <TextField
          label="alaotsikko"
          value={newSubcategory.alateksti}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              alateksti: e.target.value,
            }))
          }
        />
        <TextField
          label="alaotsikko eng"
          value={newSubcategory.alateksti_en}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              alateksti_en: e.target.value,
            }))
          }
        />
        <TextField
          label="alaotsikko swe"
          value={newSubcategory.alateksti_sv}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              alateksti_sv: e.target.value,
            }))
          }
        />
        <TextField
          label="Vuosi"
          value={newSubcategory.vuosi}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              vuosi: e.target.value,
            }))
          }
        />
        <TextField value={newSubcategory.imagePath} disabled />
        <input type="file" onChange={handleNewImageChange} />
        <Button onClick={handleCreateSubcategory}>Create</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nimi</TableCell>
              <TableCell>Kuva</TableCell>

              <TableCell>Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategories.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src={`http://localhost:3001${row.image_path}`}
                  ></img>
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleEdit(row.id)}>Muokkaa</Button>
                  <Button onClick={() => handleDelete(row.id)}>Poista</Button>
                  <Button onClick={() => handleEditContent(row)}>
                    Muokkaa mediaa
                  </Button>
                  <Button onClick={() => handleAddMedia(row)}>
                    Lisää mediaa
                  </Button>
                  <Button onClick={() => handleLahteet(row)}>lähteet</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <TextField
            label="Name"
            value={editSubcategory.name}
            onChange={(e) =>
              setEditSubcategory((prevSubcategory) => ({
                ...prevSubcategory,
                name: e.target.value,
              }))
            }
          />
          <TextField
            label="Name (English)"
            value={editSubcategory.name_en}
            onChange={(e) =>
              setEditSubcategory((prevSubcategory) => ({
                ...prevSubcategory,
                name_en: e.target.value,
              }))
            }
          />
          <TextField
            label="Name (Swedish)"
            value={editSubcategory.name_sv}
            onChange={(e) =>
              setEditSubcategory((prevSubcategory) => ({
                ...prevSubcategory,
                name_sv: e.target.value,
              }))
            }
          />
          <TextField
            label="Subtitle"
            value={editSubcategory.alateksti}
            onChange={(e) =>
              setEditSubcategory((prevSubcategory) => ({
                ...prevSubcategory,
                alateksti: e.target.value,
              }))
            }
          />
          <TextField
            label="Subtitle (English)"
            value={editSubcategory.alateksti_en}
            onChange={(e) =>
              setEditSubcategory((prevSubcategory) => ({
                ...prevSubcategory,
                alateksti_en: e.target.value,
              }))
            }
          />
          <TextField
            label="Subtitle (Swedish)"
            value={editSubcategory.alateksti_sv}
            onChange={(e) =>
              setEditSubcategory((prevSubcategory) => ({
                ...prevSubcategory,
                alateksti_sv: e.target.value,
              }))
            }
          />
          <TextField
            label="Image Path"
            value={editSubcategory.image_path}
            disabled
          />
          <input type="file" onChange={handleImageChange} />
          <Button onClick={handleSaveEdit}>Save</Button>
        </Box>
      </Modal>

      <Modal open={mediaModalOpen} onClose={() => setMediaModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1600px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <h2>Media</h2>
          {selectedMedia.map((media, index) => (
            <div key={media.id}>
              <TextField
                label="Kuvateksti"
                name="imagetext"
                value={formFields[media.id]?.imagetext || ""}
                onChange={(event) => handleImageTextChange(event, media.id)}
              />
              <TextField
                label="Kuvalähde"
                name="imagetextbold"
                value={formFields[media.id]?.imagetextbold || ""}
                onChange={(event) => handleImageTextChange(event, media.id)}
              />
              <TextField
                label="Kuva teksti (English)"
                name="imagetext_en"
                value={formFields[media.id]?.imagetext_en || ""}
                onChange={(event) => handleImageTextChange(event, media.id)}
              />
              <TextField
                label="Kuva teksti(Swedish)"
                name="imagetext_sv"
                value={formFields[media.id]?.imagetext_sv || ""}
                onChange={(event) => handleImageTextChange(event, media.id)}
              />
              <TextField
                label="Kuvalähde(English)"
                name="imagetextbold_en"
                value={formFields[media.id]?.imagetextbold_en || ""}
                onChange={(event) => handleImageTextChange(event, media.id)}
              />
              <TextField
                label="Kuvalähde (Swedish)"
                name="imagetextbold_sv"
                value={formFields[media.id]?.imagetextbold_sv || ""}
                onChange={(event) => handleImageTextChange(event, media.id)}
              />

              <input
                type="file"
                onChange={(event) => handleMediaImageChange(event, media.id)}
              />
              <Button onClick={() => handleSaveEditMedia(media.id, index)}>
                Save
              </Button>
              <Button
                onClick={() => handleDeleteMedia(selectedSubcategory, media.id)}
              >
                Delete
              </Button>
            </div>
          ))}
          <TextField
            label="Leipäteksti"
            name="text"
            value={updatedContentText.text}
            onChange={(e) =>
              setUpdatedContentText((prevUpdatedText) => ({
                ...prevUpdatedText,
                text: e.target.value,
              }))
            }
            multiline
            rows={20}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Leipäteksti (English)"
            name="text_en"
            value={updatedContentText.text_en}
            onChange={(e) =>
              setUpdatedContentText((prevUpdatedText) => ({
                ...prevUpdatedText,
                text_en: e.target.value,
              }))
            }
            multiline
            rows={20}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Leipäteksti(Swedish)"
            name="text_sv"
            value={updatedContentText.text_sv}
            onChange={(e) =>
              setUpdatedContentText((prevUpdatedText) => ({
                ...prevUpdatedText,
                text_sv: e.target.value,
              }))
            }
            multiline
            rows={20}
            variant="outlined"
            fullWidth
          />

          <Button
            onClick={() => handleSaveEditContentText(selectedSubcategory)}
          >
            Tallenna leipätekstit
          </Button>
        </Box>
      </Modal>

      <Modal open={addMediaModal} onClose={() => setAddMediaModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <h2>Add New Media</h2>
          <TextField
            label="Image Text"
            name="imagetext"
            value={newMedia.imagetext}
            onChange={handleAddMediaChange}
          />
          <TextField
            label="Image Text Bold"
            name="imagetextbold"
            value={newMedia.imagetextbold}
            onChange={handleAddMediaChange}
          />
          <TextField
            label="Image Text (English)"
            name="imagetext_en"
            value={newMedia.imagetext_en}
            onChange={handleAddMediaChange}
          />
          <TextField
            label="Image Text (Swedish)"
            name="imagetext_sv"
            value={newMedia.imagetext_sv}
            onChange={handleAddMediaChange}
          />
          <TextField
            label="Image Text Bold (English)"
            name="imagetextbold_en"
            value={newMedia.imagetextbold_en}
            onChange={handleAddMediaChange}
          />
          <TextField
            label="Image Text Bold (Swedish)"
            name="imagetextbold_sv"
            value={newMedia.imagetextbold_sv}
            onChange={handleAddMediaChange}
          />
          <Select
            label="Media Type"
            name="mediaType"
            value={newMedia.mediaType}
            onChange={handleAddMediaChange}
          >
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>
          <input type="file" onChange={handleAddMediaChange} />

          <Button onClick={handleCreateMedia}>Create</Button>
        </Box>
      </Modal>
      <LahteetModal
        open={lahteetModal}
        onClose={handleCloseLahteetModal}
        subcatId={selectedSubcategory}
        selectedSubcategory={selectedSubcategory}
      />
    </div>
  );
};

export default AdminPanel;
