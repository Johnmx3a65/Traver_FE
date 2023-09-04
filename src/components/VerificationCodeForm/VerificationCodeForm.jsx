import { Box, Grid, Link } from '@mui/material';
import styles from './VerificationCodeForm.module.css';
import React, { useState } from 'react';
import TraverInput from '../TraverInput/TraverInput';
import Timer from '../Timer/Timer';

const VerificationCodeForm = ({ onFormSubmit, verificationCodeSenderHandler, children }) => {
  const [isLinkEnabled, setIsLinkEnabled] = useState(true);
  const [inputs, setInputs] = useState(
    new Map([
      [
        'code-0',
        {
          value: '',
          hasError: false,
        },
      ],
      [
        'code-1',
        {
          value: '',
          hasError: false,
        },
      ],
      [
        'code-2',
        {
          value: '',
          hasError: false,
        },
      ],
      [
        'code-3',
        {
          value: '',
          hasError: false,
        },
      ],
    ]),
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const isFormValid = checkInputs(inputs);

    if (isFormValid) {
      const verificationCode = Array.from(inputs.values()).reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        '',
      );
      onFormSubmit({ verificationCode });
    }
  };

  const onLinkClick = () => {
    setIsLinkEnabled(false);
    verificationCodeSenderHandler();
  };

  const onTraverInputChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || isValidValue(value)) {
      setInputs((prevState) => {
        return new Map([...prevState.entries(), [name, { value, hasError: false }]]);
      });
      let [code, index] = name.split('-');
      index = Number.parseInt(index);
      if (value !== '' && index < 3) {
        focusNextInput(code, index);
      }
      if (value === '' && index > 0) {
        focusPreviousInput(code, index);
      }
    }
  };

  const checkInputs = (inputsMap) => {
    let isFormValid = true;
    Array.from(inputsMap.entries()).forEach(([name, value]) => {
      const isValid = isValidValue(value.value);
      if (!isValid) {
        setInputs((prevState) => {
          return new Map([...prevState.entries(), [name, { value: value.value, hasError: true }]]);
        });
      }
      if (isFormValid && !isValid) {
        isFormValid = isValid;
      }
    });
    return isFormValid;
  };

  const isValidValue = (value) => Number.isInteger(Number.parseInt(value)) && value.length === 1;

  const focusNextInput = (code, index) => {
    const nextInput = document.querySelector(`input[name=${code}-${index + 1}]`);
    if (nextInput) {
      nextInput.focus();
    }
  };

  const focusPreviousInput = (code, index) => {
    const previousInput = document.querySelector(`input[name=${code}-${index - 1}]`);
    if (previousInput) {
      previousInput.focus();
    }
  };

  return (
    <Box component='form' noValidate autoComplete='off' onSubmit={onSubmit}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container columnGap={0.5} justifyContent='space-between'>
            {Array.from(inputs.entries()).map(([name, value]) => (
              <Grid key={name} item xs={2.5}>
                <TraverInput
                  name={name}
                  width='70px'
                  height='50px'
                  className={styles.input}
                  value={value.value}
                  onChange={onTraverInputChange}
                  error={value.hasError}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop='15px'>
          <Grid container direction='column' alignItems='flex-end' justifyContent='flex-end'>
            <Grid item>
              {isLinkEnabled && (
                <Link color='#BABABA' underline='none' sx={{ cursor: 'pointer' }} onClick={onLinkClick}>
                  Изпрати нов
                </Link>
              )}
              {!isLinkEnabled && <Timer className={styles.timer} seconds={10} callback={() => setIsLinkEnabled(true)} />}
            </Grid>
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Box>
  );
};

export default VerificationCodeForm;
