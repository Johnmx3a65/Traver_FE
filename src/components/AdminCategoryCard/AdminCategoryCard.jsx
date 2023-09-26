import styles from './AdminCategoryCard.module.css';
import { Box, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React from 'react';

const AdminCategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Box display='grid' gridTemplateColumns='1fr max-content'>
          <Typography variant='h5' className={styles.title}>
            {category.name}
          </Typography>
          <Box>
            <Tooltip title={'Промени категория'}>
              <IconButton onClick={onEdit}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Изтрий категория'}>
              <IconButton onClick={onDelete}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box className={styles.contentSingles}>
          <Typography className={styles.contentLabels}>Снимка:</Typography>
          <Typography className={styles.contentPicture}>{category.picture}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminCategoryCard;
