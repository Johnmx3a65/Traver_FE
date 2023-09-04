import styles from './AdminLocationCard.module.css';
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, { Fragment } from 'react';

const AdminLocationCard = ({ location, categories, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '370px' }}>
      <CardHeader
        title={location.name}
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
        <Box className={styles.contentPairs}>
          <Box>
            <Typography className={styles.contentLabels}>Id:</Typography>
            <Typography className={styles.contentValues}>{location.id}</Typography>
          </Box>
          <Box>
            <Typography className={styles.contentLabels}>Координати:</Typography>
            <Typography className={styles.contentValues}>{location.coordinates}</Typography>
          </Box>
        </Box>
        <Box className={styles.contentPairs}>
          <Box>
            <Typography className={styles.contentLabels}>Подзаглавие:</Typography>
            <Typography className={styles.contentValues}>{location.subtitle}</Typography>
          </Box>
          <Box>
            <Typography className={styles.contentLabels}>Категория:</Typography>
            <Typography className={styles.contentValues}>
              {categories?.find((c) => c.id === location.categoryId)?.name}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.contentSingles}>
          <Typography className={styles.contentLabels}>Главна Снимка:</Typography>
          <Typography className={styles.contentPicture}>{location.picture}</Typography>
        </Box>
        <Box>
          <Typography className={styles.contentLabels}>Описание:</Typography>
          <Typography className={styles.contentDescription}>{location.description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminLocationCard;
