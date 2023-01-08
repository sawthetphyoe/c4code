import { Box, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddLectureForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleURLChange = (e) => {
    setUrl(e.target.value);
  };
  return (
    <Box sx={modalStyle}>
      <Grid container spacing={2}>
        <Typography variant="h6" component="span">
          Add Video from YouTube
        </Typography>
        <Grid item sm={12}>
          <TextField
            required
            fullWidth
            label="Lecture Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            required
            fullWidth
            label="Video URL"
            value={url}
            onChange={handleURLChange}
            helperText="Only videos from YouTube and Vimeo are allowed!"
          />
        </Grid>
      </Grid>
      <iframe
        width="1010"
        height="568"
        src="https://www.youtube.com/embed/4AqhFCvI3Bc"
        title="Coinsavvy - Crypto Simulation Web Application | CS50 Final Project Presentation"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Box>
  );
}

export default AddLectureForm;
