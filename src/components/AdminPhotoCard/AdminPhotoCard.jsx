import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import styles from './AdminPhotoCard.module.css';

const AdminPhotoCard = ({ photo, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader
        title={photo.id}
        action={
          <Fragment>
            <IconButton onClick={onEdit}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Fragment>
        }
      />
      <CardContent>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography className={styles.contentLabels}>Оптимизирана снимка</Typography>
          <Typography className={styles.contentValues}>{photo.previewUrl}</Typography>
        </Box>
        <Box>
          <Typography className={styles.contentLabels}>Пълна снимка</Typography>
          <Typography className={styles.contentValues}>{photo.fullUrl}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminPhotoCard;
