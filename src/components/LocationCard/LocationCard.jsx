import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import styles from './LocationCard.module.css';

const LocationCard = ({ src, title, description, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={`${src}`} alt={title} />
      </div>
      <div className={styles.shadow} />
      <div className={styles.contentContainer}>
        <h2 className={styles.contentTitle}>{title}</h2>
        <p className={styles.contentDescription}>
          <span>
            <PlaceIcon sx={{ height: '20px' }} />
          </span>
          {description}
        </p>
      </div>
    </div>
  );
};

export default LocationCard;
