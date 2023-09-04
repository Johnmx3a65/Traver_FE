import styles from './TraverSearch.module.css';
import { InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const TraverSearch = ({ onSearch, placeholder, className }) => {
  return (
    <OutlinedInput
      className={`${className} ${styles.search}`}
      placeholder={placeholder}
      onChange={onSearch}
      endAdornment={
        <InputAdornment position='end'>
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

export default TraverSearch;
