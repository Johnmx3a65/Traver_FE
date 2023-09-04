import React from 'react';
import { Link } from '@mui/material';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ src, title, onClick, isActive }) => (
  <div className={`${styles.categoryContainer} ${isActive && styles.categoryContainerActive}`} onClick={onClick}>
    <div className={styles.categoryIconContainer}>
      <img className={styles.categoryIcon} src={src} alt={title} />
    </div>
    <Link className={styles.categoryLink} underline='none'>
      {title}
    </Link>
  </div>
);

export default CategoryCard;
