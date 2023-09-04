import { TextField } from '@mui/material';

const TraverInput = ({ width, height, ...otherProps }) => (
  <TextField
    sx={{
      '& .MuiOutlinedInput-root': {
        border: '1px solid #E8E8E8',
        borderRadius: '15px',
        width,
        height,
      },
    }}
    {...otherProps}
  />
);

export default TraverInput;
