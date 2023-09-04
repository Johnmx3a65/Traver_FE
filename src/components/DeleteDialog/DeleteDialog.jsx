import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const DeleteDialog = ({ open, title, text, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{text}</p>
      </DialogContent>
      <DialogActions>
        <Button color='primary' variant='outlined' onClick={onSubmit}>
          Изтрий
        </Button>
        <Button onClick={onClose}>Затвори</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
