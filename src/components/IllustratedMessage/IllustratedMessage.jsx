import React from 'react';
import { Grid, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

const IllustratedMessage = ({
  type = 'error',
  message = 'Възникна неочаквана грешка. Моля, опитайте по-късно.',
  children,
}) => {
  return (
    <Grid container flexDirection='column' justifyContent='center' alignItems='center'>
      <Grid item>
        {type === 'error' && <ReportIcon sx={{ width: '300px', height: '300px' }} />}
        {type === 'empty' && <FilterDramaIcon sx={{ width: '300px', height: '300px' }} />}
      </Grid>
      <Grid item>
        <Typography variant='h5' component='h5'>
          {message}
        </Typography>
      </Grid>
      {!!children && <Grid item>{children}</Grid>}
    </Grid>
  );
};

export default IllustratedMessage;
