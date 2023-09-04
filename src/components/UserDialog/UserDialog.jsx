import React from 'react';
import { MenuItem } from '@mui/material';
import { UserDefaultValues, UserDialogInputs, UserSchema } from './UserSchema';
import FormInput from '../FormInput/FormInput';
import FormDialog from '../FormDialog/FormDialog';

const UserDialog = ({ user, onAdd, onEdit, ...otherProps }) => {
  const handleSubmit = (data) => {
    if (user?.id) {
      onEdit(data);
      return;
    }
    onAdd(data);
  };

  return (
    <FormDialog
      title={user?.id ? 'Промени потребител' : 'Добави потребител'}
      zodSchema={UserSchema}
      entity={user}
      onSubmit={handleSubmit}
      defaultValues={UserDefaultValues}
      {...otherProps}
    >
      {UserDialogInputs.map((input, index) => (
        <FormInput key={`input-${index}`} margin='dense' {...input} fullWidth />
      ))}
      <FormInput name='role' margin='dense' label='Роля' select required fullWidth>
        {user.roles.map((option, i) => (
          <MenuItem key={`role-${i}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </FormInput>
    </FormDialog>
  );
};

export default UserDialog;
