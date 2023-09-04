import React from 'react';
import { CategoryDefaultValues, CategoryDialogInputs, CategorySchema } from './CategorySchema';
import FormInput from '../FormInput/FormInput';
import FormDialog from '../FormDialog/FormDialog';

const CategoryDialog = ({ category, onAdd, onEdit, ...otherProps }) => {
  const handleSubmit = (data) => {
    if (category?.id) {
      onEdit(data);
      return;
    }
    onAdd(data);
  };

  return (
    <FormDialog
      title={category?.id ? 'Промени категория' : 'Добави категория'}
      zodSchema={CategorySchema}
      entity={category}
      onSubmit={handleSubmit}
      defaultValues={CategoryDefaultValues}
      {...otherProps}
    >
      {CategoryDialogInputs.map((input, index) => (
        <FormInput key={`input-${index}`} margin='dense' {...input} fullWidth />
      ))}
    </FormDialog>
  );
};

export default CategoryDialog;
