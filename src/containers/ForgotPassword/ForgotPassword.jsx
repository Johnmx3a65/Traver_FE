import { Box, Grid, Typography } from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import VerificationCodeForm from '../../components/VerificationCodeForm/VerificationCodeForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/FormInput/FormInput';
import { EmailDefaultValue, EmailSchema, PasswordsDefaultValues, PasswordsSchema } from './ForgotPasswordSchema';
import { useCheckVerificationCode } from '../../hooks/auth/checkVerificationCode';
import { useSendVerificationCode } from '../../hooks/auth/sendVerificationCode';
import { useResetPassword } from '../../hooks/auth/resetPassword';
import TraverButton from '../../components/TraverButton/TraverButton';

const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const payload = useRef(null);
  const { resetPassword } = useResetPassword();
  const { checkVerificationCode } = useCheckVerificationCode();
  const { sendVerificationCode } = useSendVerificationCode();
  const navigate = useNavigate();

  const onPrimaryButtonClick = (data) => {
    if (step === 0) {
      sendVerificationCode({ email: data.email }, () => {
        payload.current = { email: data.email };
        setStep(step + 1);
      });
    } else if (step === 1) {
      checkVerificationCode(
        {
          email: payload.current.email,
          verificationCode: data.verificationCode,
        },
        () => {
          payload.current = { ...payload.current, verificationCode: data.verificationCode };
          setStep(step + 1);
        },
      );
    } else {
      payload.current = { ...payload.current, password: data.password };
      resetPassword({ ...payload.current }, () => {
        navigate('/login');
      });
    }
  };

  const onSecondaryButtonClick = () => {
    if (step > 0) {
      setStep(step - 1);
      return;
    }
    navigate('/login');
  };

  const onSendCodeClick = () => {
    sendVerificationCode({ email: payload.current.email });
  };

  const StepForm = ({ resolver, defaultValues, children }) => {
    const methods = useForm({
      resolver: zodResolver(resolver),
      defaultValues: defaultValues,
    });

    const { handleSubmit } = methods;

    return (
      <FormProvider {...methods}>
        <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onPrimaryButtonClick)}>
          {children}
        </Box>
      </FormProvider>
    );
  };

  const Content = ({ children }) => {
    const FormInputExtraStyles = {
      '& .MuiOutlinedInput-root': {
        border: '1px solid #E8E8E8',
        borderRadius: '15px',
        height: '50px',
      },
    };

    const EmailInput = (
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormInput
            required
            name='email'
            type='email'
            label='Ел. поща'
            margin='dense'
            fullWidth
            sx={FormInputExtraStyles}
          />
        </Grid>
        {children}
      </Grid>
    );

    const CodeInput = (
      <VerificationCodeForm onFormSubmit={onPrimaryButtonClick} verificationCodeSenderHandler={onSendCodeClick}>
        {children}
      </VerificationCodeForm>
    );

    const PasswordInputs = (
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormInput
            required
            name='password'
            type='password'
            label='Парола'
            margin='dense'
            fullWidth
            sx={FormInputExtraStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            required
            name='confirmPassword'
            type='password'
            label='Подтвърдете паролата'
            margin='dense'
            fullWidth
            sx={FormInputExtraStyles}
          />
        </Grid>
        {children}
      </Grid>
    );

    const steps = [
      {
        layout: EmailInput,
        resolver: EmailSchema,
        defaultValues: EmailDefaultValue,
        hasUseForm: true,
      },
      {
        layout: CodeInput,
      },
      {
        layout: PasswordInputs,
        resolver: PasswordsSchema,
        defaultValues: PasswordsDefaultValues,
        hasUseForm: true,
      },
    ];

    const current = steps[step];

    return (
      <Fragment>
        {current.hasUseForm ? (
          <StepForm resolver={current.resolver} defaultValues={current.defaultValues}>
            {current.layout}
          </StepForm>
        ) : (
          current.layout
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Box className={styles.center}>
        <Grid container width='375px'>
          <Grid item xs={12} marginBottom='60px'>
            <Typography variant='h4' component='h4'>
              Забравена Парола
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Content>
              <Grid item xs={12} marginTop='50px'>
                <TraverButton type='submit' colorType='primary' className={styles.button}>
                  {step === 1 ? 'Напред' : 'Потвърди'}
                </TraverButton>
              </Grid>
              <Grid item xs={12}>
                <TraverButton className={styles.button} onClick={onSecondaryButtonClick}>
                  Назад
                </TraverButton>
              </Grid>
            </Content>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ForgotPassword;
