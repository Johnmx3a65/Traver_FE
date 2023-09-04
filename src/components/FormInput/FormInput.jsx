import React from 'react';
import { Box, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({ name, children, hidden, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={hidden && { display: { xs: 'none' } }}>
      <Controller
        control={control}
        name={name}
        defaultvalue=''
        render={({ field }) => (
          <TextField
            {...otherProps}
            {...field}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
          >
            {children}
          </TextField>
        )}
      />
    </Box>
  );
};

export default FormInput;
