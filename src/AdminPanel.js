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
} from "./components/api";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMediaImage, setSelectedMediaImage] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState([]);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedContentText, setSelectedContentText] = useState([]);
  const [updatedImageText, setUpdatedImageText] = useState([]);
  const [updatedImageTextBold, setUpdatedImageTextBold] = useState([]);
  const [updatedContentText, setUpdatedContentText] = useState("");
  const [addMediaModal, setAddMediaModal] = useState(false);
  const [newMedia, setNewMedia] = useState({
    imagetext: "",
    imagetextbold: "",
    selectedMediaFile: null,
    mediaType: "image", // or video
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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

  const handleEdit = (subcategoryId) => {
    const subcategory = subcategories.find((s) => s.id === subcategoryId);
    setEditSubcategory({
      id: subcategoryId,
      name: subcategory.name,
    });
    setEditModalOpen(true);
  };

  const handleEditContent = (subcategory) => {
    setSelectedSubcategory(subcategory.id);
    Promise.all([fetchMedia(subcategory.id), fetchContentText(subcategory.id)])
      .then(([mediaResponse, contentResponse]) => {
        const media = mediaResponse.data;
        const contentText = contentResponse.data;

        setSelectedMedia(media);
        setSelectedContentText(contentText);
        setUpdatedImageText(media.map((m) => m.imagetext));
        setUpdatedImageTextBold(media.map((m) => m.imagetextbold));
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
    const updatedText = updatedContentText;

    if (selectedContentText.length === 0) {
      // If there is no content text, create a new one
      createContentText(id, updatedText)
        .then((response) => {
          setSelectedContentText([response.data]);
          setUpdatedContentText("");
        })
        .catch((error) => {
          console.error("Error creating content text: ", error);
        });
    } else {
      // If content text already exists, update it
      updateContentText(id, updatedText)
        .then(() => {
          fetchContentText(id)
            .then((response) => setSelectedContentText([response.data]))
            .catch((error) => {
              console.error("Error fetching content text: ", error);
            });

          setUpdatedContentText("");
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
          imagePath: "",
          selectedImage: null,
        });
      })
      .catch((error) => {
        console.error("Error creating subcategory: ", error);
      });
  };

  const handleSaveEdit = () => {
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
  };

  const handleDelete = (id) => {
    console.log(`Delete record with id: ${id}`);
  };

  const handleContentTextChange = (event) => {
    setUpdatedContentText(event.target.value);
  };

  const handleImageTextChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "imagetext") {
      const updatedTexts = [...updatedImageText];
      updatedTexts[index] = value;
      setUpdatedImageText(updatedTexts);
    } else if (name === "imagetextbold") {
      const updatedTextsBold = [...updatedImageTextBold];
      updatedTextsBold[index] = value;
      setUpdatedImageTextBold(updatedTextsBold);
    }
  };

  const handleAddMedia = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setAddMediaModal(true);
  };

  const handleCreateMedia = () => {
    const formData = new FormData();
    formData.append("file", newMedia.selectedMediaFile);
    formData.append("imagetext", newMedia.imagetext);
    formData.append("imagetextbold", newMedia.imagetextbold);
    formData.append("type", newMedia.mediaType);

    createMedia(selectedSubcategory.id, formData) // ensure you are passing the id of the selected subcategory here
      .then((response) => {
        setSelectedMedia((prevState) => [...prevState, response.data]);
        setNewMedia({
          imagetext: "",
          imagetextbold: "",
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

    if (selectedMediaImage) {
      formData.append("file", selectedMediaImage);
    }

    formData.append("imagetext", updatedImageText[index]);
    formData.append("imagetextbold", updatedImageTextBold[index]);

    const selectedMediaType = media.video_path ? "video" : "image";

    if (selectedMediaType === "image") {
      formData.append("image_path", media.image_path);
    } else {
      formData.append("video_path", media.video_path);
    }

    updateMedia(mediaId, formData)
      .then((response) => {
        const updatedMediaData = response.data;
        media.imagetext = updatedMediaData.imagetext;
        media.imagetextbold = updatedMediaData.imagetextbold;
        media.image_path = updatedMediaData.image_path;
        media.video_path = updatedMediaData.video_path;
        setSelectedMedia(updatedMedia);
      })
      .catch((error) => {
        console.error("Error updating media: ", error);
      });
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
        <h2>Add new subcategory</h2>
        <TextField
          label="Name"
          value={newSubcategory.name}
          onChange={(e) =>
            setNewSubcategory((prevSubcategory) => ({
              ...prevSubcategory,
              name: e.target.value,
            }))
          }
        />
        <TextField
          label="Image Path"
          value={newSubcategory.imagePath}
          disabled
        />
        <input type="file" onChange={handleNewImageChange} />
        <Button onClick={handleCreateSubcategory}>Create</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image Path</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell>{row.image_path}</TableCell>
                <TableCell>{row.category_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                  <Button onClick={() => handleEditContent(row)}>
                    Edit Media
                  </Button>
                  <Button onClick={() => handleAddMedia(row)}>Add Media</Button>
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
            overflowY: "auto", // Add this line
            maxHeight: "80vh", // Add this line
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
            width: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // Add this line
            maxHeight: "80vh", // Add this line
          }}
        >
          <h2>Media</h2>
          {selectedMedia.map((media, index) => (
            <div key={media.id}>
              <p>Title: {media.imagetext}</p>
              <p>Image Path: {media.image_path}</p>
              <p>Video Path: {media.video_path}</p>
              <TextField
                label="Image Text"
                name="imagetext"
                value={updatedImageText[index] || ""}
                onChange={(e) => handleImageTextChange(e, index)}
              />
              <TextField
                label="Image Text Bold"
                name="imagetextbold"
                value={updatedImageTextBold[index] || ""}
                onChange={(e) => handleImageTextChange(e, index)}
              />
              {media.video_path && (
                <video controls>
                  <source
                    src={`http://localhost:3001${media.video_path}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              <input type="file" onChange={handleMediaImageChange} />
              <Button onClick={() => handleSaveEditMedia(media.id, index)}>
                Save
              </Button>
            </div>
          ))}
          <TextField
            label="Content Text"
            name="contenttext"
            value={updatedContentText || selectedContentText[0]?.text || ""}
            onChange={handleContentTextChange}
            multiline
            rows={20} // Adjust the number of rows as needed
            variant="outlined"
            fullWidth
          />
          <Button
            onClick={() => handleSaveEditContentText(selectedSubcategory)}
          >
            Save Content Text
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
            overflowY: "auto", // Add this line
            maxHeight: "80vh", // Add this line
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
    </div>
  );
};

export default AdminPanel;
