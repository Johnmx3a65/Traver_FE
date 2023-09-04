import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid } from '@mui/material';
import React from 'react';
import FormInput from '../../../components/FormInput/FormInput';
import { RegistrationDefaultValues, RegistrationSchema } from './RegistrationSchema';

const RegistrationForm = ({ onFormSubmit, children }) => {
  const methods = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: RegistrationDefaultValues,
  });

  const { handleSubmit } = methods;

  const inputs = [
    {
      name: 'firstName',
      label: 'Име',
    },
    {
      name: 'lastName',
      label: 'Фамилия',
    },
    {
      name: 'email',
      label: 'Ел. поща',
    },
    {
      name: 'password',
      label: 'Парола',
      type: 'password',
    },
    {
      name: 'confirmPassword',
      label: 'Подтвърдете паролата',
      type: 'password',
    },
  ];

  return (
    <FormProvider {...methods}>
      <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent='center' alignItems='center'>
              {inputs.map((input, i) => (
                <Grid key={`registration-input-${i}`} item xs={12}>
                  <FormInput
                    {...input}
                    required
                    margin='dense'
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        border: '1px solid #E8E8E8',
                        borderRadius: '15px',
                        height: '50px',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default RegistrationForm;
