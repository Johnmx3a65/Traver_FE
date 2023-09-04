import { Box, Modal } from '@mui/material';
import style from './PhotoModal.module.css';
import React from 'react';

const PhotoModal = ({ photo, ...otherProps }) => {
  return (
    <Modal {...otherProps}>
      <Box className={style.container}>
        <img className={style.photo} src={photo?.fullUrl} alt={'img-' + photo?.id} />
      </Box>
    </Modal>
  );
};

export default PhotoModal;
