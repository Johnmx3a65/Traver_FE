import React from 'react';
import { Box, Container, Link } from '@mui/material';
import logo from '../../assets/logo.svg';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDefaultValues, LoginSchema } from './LoginSchema';
import { useLogin } from '../../hooks/auth/login';
import TraverButton from '../../components/TraverButton/TraverButton';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleFormSubmit = ({ email, password }) => {
    login({ email, password });
  };

  const methods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });

  const { handleSubmit } = methods;

  const formInputStylesOverride = {
    '& .MuiOutlinedInput-root': {
      border: '1px solid #E8E8E8',
      borderRadius: '15px',
      height: '50px',
    },
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box component='img' src={logo} alt='traver-logo' sx={{ m: 1 }} />
        <FormProvider {...methods}>
          <Box component='form' noValidate autoComplete='off' sx={{ mt: 1, width: '100%' }}>
            <FormInput
              name='email'
              type='email'
              label='Ел. поща'
              required
              margin='dense'
              fullWidth
              sx={formInputStylesOverride}
            />
            <FormInput
              name='password'
              type='password'
              label='Парола'
              required
              margin='dense'
              fullWidth
              sx={formInputStylesOverride}
            />
            <Box sx={{ textAlign: 'end' }}>
              <Link
                color='#BABABA'
                underline='none'
                className={styles.forgotPassword}
                onClick={() => navigate('/forgot-password')}
              >
                Забравена парола
              </Link>
            </Box>
            <TraverButton
              colorType='primary'
              className={styles.button}
              onClick={handleSubmit(handleFormSubmit)}
              sx={{ mt: 3, mb: 2 }}
            >
              Вход
            </TraverButton>
            <TraverButton onClick={() => navigate('/sign-up')} className={styles.button}>
              Регистрация
            </TraverButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Login;
