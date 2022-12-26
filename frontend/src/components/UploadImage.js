import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Avatar } from '@mui/material';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          <PhotoCamera sx={{ fontSize: 18, mr: 1 }} /> Profile Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="subtitle2">IMAGE PREVIEW:</Typography>
          <Avatar
            src={imageUrl}
            alt={selectedImage.name}
            sx={{ height: 150, width: 150 }}
          />
        </Box>
      )}
    </>
  );
};

export default UploadImage;
