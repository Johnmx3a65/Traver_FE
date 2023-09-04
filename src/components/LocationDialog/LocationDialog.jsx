import React from 'react';
import { MenuItem } from '@mui/material';
import FormDialog from '../FormDialog/FormDialog';
import FormInput from '../FormInput/FormInput';
import { LocationDefaultValues, LocationDialogInputs, LocationSchema } from './LocationSchema';

const LocationDialog = ({ location, onAdd, onEdit, ...otherProps }) => {
  const handleSubmit = (data) => {
    if (location?.id) {
      onEdit(data);
      return;
    }
    onAdd(data);
  };

  return (
    <FormDialog
      title={location?.id ? 'Промени локация' : 'Добави локация'}
      zodSchema={LocationSchema}
      entity={location}
      onSubmit={handleSubmit}
      defaultValues={LocationDefaultValues}
      {...otherProps}
    >
      {LocationDialogInputs.map((input, index) => (
        <FormInput key={`input-${index}`} margin='dense' {...input} fullWidth />
      ))}
      <FormInput name='categoryId' margin='dense' label='Категория' select required fullWidth>
        {location?.categories?.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </FormInput>
      <FormInput
        name='description'
        margin='dense'
        placeholder='Description'
        label='Описание'
        multiline
        required
        fullWidth
      />
    </FormDialog>
  );
};

export default LocationDialog;
