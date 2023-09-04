import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormDialog = ({ zodSchema, defaultValues, entity, children, title, open, ...props }) => {
  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const { setValue, reset, handleSubmit } = methods;

  useEffect(() => {
    reset();
    if (entity) {
      for (const [key, value] of Object.entries(entity)) {
        setValue(key, value);
      }
    }
  }, [entity, reset, setValue]);

  const onSubmit = (data) => {
    reset();
    props.onSubmit(data);
  };

  const closeHandler = () => {
    reset();
    props.onClose();
  };

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth={true}>
      <FormProvider {...methods}>
        <Box component='form' noValidate autoComplete='off'>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button color='primary' variant='outlined' type='submit' onClick={handleSubmit(onSubmit)}>
              Запази
            </Button>
            <Button onClick={closeHandler}>Затвори</Button>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default FormDialog;
