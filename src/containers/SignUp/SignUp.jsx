import React, { Fragment, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import VerificationCodeForm from '../../components/VerificationCodeForm/VerificationCodeForm';
import { useRegister } from '../../hooks/auth/register';
import { useCheckVerificationCode } from '../../hooks/auth/checkVerificationCode';
import { useSendVerificationCode } from '../../hooks/auth/sendVerificationCode';
import TraverButton from '../../components/TraverButton/TraverButton';
import useAlert from '../../hooks/alert';
import { ALERT_MESSAGE_ON_SUCCESSFUL_REGISTRATION } from '../../utils/constraints';

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const { register } = useRegister();
  const { checkVerificationCode } = useCheckVerificationCode();
  const { sendVerificationCode } = useSendVerificationCode();
  const navigate = useNavigate();
  const openAlert = useAlert();

  const onFormSubmit = (data) => {
    if (step === 0) {
      register(
        {
          email: data.email,
          password: data.password,
          name: data.firstName.concat(' ', data.lastName),
          role: 'USER',
        },
        () => {
          setEmail(data.email);
          setStep(step + 1);
        },
      );
    } else {
      checkVerificationCode({ email, verificationCode: data.verificationCode }, () => {
        navigate('/login');
        openAlert(ALERT_MESSAGE_ON_SUCCESSFUL_REGISTRATION, 'success');
      });
    }
  };

  const onSecondaryButtonClick = () => {
    if (step === 2) {
      setStep(step - 1);
      return;
    }
    navigate('/login');
  };

  const onSendCodeClick = () => {
    sendVerificationCode({ email });
  };

  const Content = ({ children }) => {
    const step1 = <RegistrationForm onFormSubmit={onFormSubmit}>{children}</RegistrationForm>;

    const step2 = (
      <VerificationCodeForm onFormSubmit={onFormSubmit} verificationCodeSenderHandler={onSendCodeClick}>
        {children}
      </VerificationCodeForm>
    );

    const steps = [step1, step2];

    const current = steps[step];

    return <Fragment>{current}</Fragment>;
  };

  return (
    <Fragment>
      <Box className={styles.center}>
        <Grid container width='375px'>
          <Grid item xs={12} marginBottom='60px'>
            <Typography variant='h4' component='h4'>
              Регистрация
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Content>
              <Grid item xs={12}>
                <TraverButton type='submit' colorType='primary' className={styles.button}>
                  {step === 0 ? 'Създай акаунт' : 'Потвърди'}
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

export default SignUp;
