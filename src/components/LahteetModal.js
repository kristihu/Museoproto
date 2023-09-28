import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, TextField } from "@mui/material";
import { createLahteet, fetchLahteet, updateLahteet } from "./api";

const LahteetModal = ({ open, onClose, selectedSubcategory }) => {
  const [formData, setFormData] = useState({
    tekijat: "",
    esiintyjat: "",
    esiintyjat_en: "",
    esiintyjat_sv: "",
    lahteet: "",
  });
  const [testi, setTesti] = useState(false);

  useEffect(() => {
    if (selectedSubcategory) {
      fetchLahteet(selectedSubcategory.id)
        .then((response) => {
          const lahteetData = response.data;
          console.log(lahteetData, "lahteetdata");
          if (lahteetData.length > 0) {
            setTesti(true);
            setFormData((prevData) => ({
              ...prevData,
              tekijat: lahteetData[0]?.tekijat || "",
              esiintyjat: lahteetData[0]?.esiintyjat || "",
              esiintyjat_en: lahteetData[0]?.esiintyjat_en || "",
              esiintyjat_sv: lahteetData[0]?.esiintyjat_sv || "",
              lahteet: lahteetData[0]?.lahteet || "",
            }));
          } else {
            setTesti(false);
            setFormData({
              tekijat: "",
              esiintyjat: "",
              esiintyjat_en: "",
              esiintyjat_sv: "",
              lahteet: "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching lahteet", error);
        });
    }
  }, [selectedSubcategory]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formDataWithId = {
      ...formData,
      subcategory_id: selectedSubcategory.id,
    };

    if (testi) {
      updateLahteet(selectedSubcategory.id, formDataWithId)
        .then(() => {
          window.alert("Lähteiden tallennus onnistui!");
          onClose();
        })
        .catch((error) => {
          console.error("Error updating lahteet", error);
        });
    } else {
      console.log(formDataWithId, "asd");
      createLahteet(formDataWithId)
        .then(() => {
          setFormData({
            tekijat: "",
            esiintyjat: "",
            esiintyjat_en: "",
            esiintyjat_sv: "",
            lahteet: "",
          });
          window.alert("Lähteiden tallennus onnistui!");
          onClose();
        })
        .catch((error) => {
          console.error("Error creating lahteet", error);
        });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          maxHeight: "80vh",
        }}
      >
        <TextField
          name="tekijat"
          label="Esiintyjät"
          multiline
          rows={10}
          value={formData.tekijat}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <TextField
          name="esiintyjat"
          label="Tekijät"
          multiline
          rows={10}
          value={formData.esiintyjat}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="Tekijät_en"
          label="esiintyjaten"
          multiline
          rows={10}
          value={formData.esiintyjat_en}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="tekijät_sv"
          label="esiintyjatensv"
          multiline
          rows={10}
          value={formData.esiintyjat_sv}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="lahteet"
          label="lahteet"
          multiline
          rows={10}
          value={formData.lahteet}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Lisää lähteet
        </Button>
      </Box>
    </Modal>
  );
};

export default LahteetModal;
