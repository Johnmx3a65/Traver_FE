import React from 'react';
import { Box, Button } from '@mui/material';
import styles from './NotFound.module.css';
import IllustratedMessage from '../../components/IllustratedMessage/IllustratedMessage';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <IllustratedMessage type='empty' message='Не сте на правилното място.'>
        <Button onClick={() => navigate('/')} className={styles.homeButton}>
          Обратно
        </Button>
      </IllustratedMessage>
    </Box>
  );
};

export default NotFound;
