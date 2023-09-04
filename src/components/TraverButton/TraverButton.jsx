import { Button } from '@mui/material';
import styles from './TraverButton.module.css';

const TraverButton = ({ className, colorType, children, ...otherProps }) => (
  <Button
    className={`${className} ${styles.button} ${colorType === 'primary' ? styles.primary : styles.secondary}`}
    {...otherProps}
  >
    {children}
  </Button>
);

export default TraverButton;
