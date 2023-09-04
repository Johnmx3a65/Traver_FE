import React from 'react';
import FormInput from '../FormInput/FormInput';
import FormDialog from '../FormDialog/FormDialog';
import { PhotoDefaultValues, PhotoDialogInputs, PhotoSchema } from './PhotoSchema';

const PhotoDialog = ({ photo, onAdd, onEdit, ...otherProps }) => {
  const handleSubmit = (data) => {
    if (photo?.id) {
      onEdit(data);
      return;
    }
    onAdd(data);
  };

  return (
    <FormDialog
      title={photo?.id ? 'Промени снимка' : 'Добави снимка'}
      zodSchema={PhotoSchema}
      entity={photo}
      onSubmit={handleSubmit}
      defaultValues={PhotoDefaultValues}
      {...otherProps}
    >
      {PhotoDialogInputs.map((input, index) => (
        <FormInput key={`input-${index}`} margin='dense' {...input} fullWidth />
      ))}
    </FormDialog>
  );
};

export default PhotoDialog;
