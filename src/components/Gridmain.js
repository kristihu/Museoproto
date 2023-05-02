import React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2';



const Gridmain = ({ images, handleClick }) => {
  const handleImageClick = (index) => {
    handleClick(index);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {images.map((image, index) => (
          <Grid xs={2} sm={4} md={4} key={index} onClick={() => handleImageClick(index)}>
            <img src={image.image} alt={` ${index}`} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gridmain;
