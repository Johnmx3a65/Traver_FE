import styles from './AdminUserCard.module.css';
import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, { Fragment } from 'react';

const AdminUserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography component='h1' className={styles.headerTitle}>
            {user.name}
          </Typography>
        }
        action={
          <Fragment>
            <Tooltip title={'Промени потребител'}>
              <IconButton onClick={onEdit}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Изтрий потребител'}>
              <IconButton onClick={onDelete}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Fragment>
        }
      />
      <CardContent>
        <Box className={styles.contentPairs}>
          <Box>
            <Typography className={styles.contentLabels}>Id:</Typography>
            <Typography className={styles.contentValues}>{user.id}</Typography>
          </Box>
          <Box>
            <Typography variant='span' component='span' className={styles.contentLabels}>
              Роля:
            </Typography>
            <br />
            <Typography component='span' className={styles.contentValues}>
              {user.role}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.contentSingles}>
          <Typography className={styles.contentLabels}>Електронна поща:</Typography>
          <Typography className={styles.contentPicture}>{user.email}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminUserCard;
