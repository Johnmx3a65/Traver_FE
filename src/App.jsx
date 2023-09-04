import React, { Fragment } from 'react';
import styles from './App.module.css';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useActions } from './hooks/actions';
import Router from './Router';
import Alert from './components/Аlert/Alert';

function App() {
  const { setAlertOpen } = useActions();
  const { loadingStack, alertMessage, alertOpen, alertType } = useSelector((state) => state.traver);

  return (
    <Fragment>
      <Alert message={alertMessage} open={alertOpen} type={alertType} onClose={() => setAlertOpen(false)} />
      {loadingStack.length > 0 && (
        <Box className={styles.loadingContainer}>
          <Box className={styles.loadingItem}>
            <CircularProgress />
          </Box>
        </Box>
      )}
      <Router />
    </Fragment>
  );
}

export default App;
