import React, { Fragment } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import LocationCard from '../../components/LocationCard/LocationCard';
import TraverSearch from '../../components/TraverSearch/TraverSearch';
import IllustratedMessage from '../../components/IllustratedMessage/IllustratedMessage';
import useFilter from '../../hooks/filter';
import { isArrayEmptyOrNullish } from '../../utils/util';
import {
  ILLUSTRATED_MESSAGE_NO_ADDED_CATEGORIES,
  ILLUSTRATED_MESSAGE_NO_DATA,
  ILLUSTRATED_MESSAGE_NO_LOCATIONS_IN_CATEGORY,
  SEARCH_LOCATION,
} from '../../utils/constraints';
import { useGetCategories } from '../../hooks/category/getCategories';
import { useGetLocationsByCategory } from '../../hooks/location/getLocationsByCategory';

const Categories = () => {
  const navigate = useNavigate();
  const {
    category,
    categories,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
    setCategory,
  } = useGetCategories();
  const { locations, isSuccess: isLocationsSuccess, isError: isLocationsError } = useGetLocationsByCategory(category);

  const { filteredItems: filteredLocations, isFilterEmpty, searchHandler } = useFilter(locations, 'name');

  if (isCategoriesError || isLocationsError) {
    return <IllustratedMessage />;
  }

  if (isCategoriesSuccess && isArrayEmptyOrNullish(categories)) {
    return <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_CATEGORIES} />;
  }

  return (
    <Fragment>
      <Typography marginBottom='1rem' textAlign='center' variant='h5' component='h5'>
        Категории
      </Typography>
      <Box marginBottom='1rem'>
        <TraverSearch onSearch={searchHandler} placeholder={SEARCH_LOCATION} />
      </Box>
      <Typography marginBottom='1rem'>Избери категория</Typography>
      <Box className={styles.categoryList}>
        {categories?.map((item) => (
          <Box key={item.id} className={styles.categoryItem}>
            <CategoryCard
              src={item.picture}
              title={item.name}
              isActive={category?.id === item.id}
              onClick={() => setCategory(item)}
            />
          </Box>
        ))}
      </Box>
      <Typography marginBottom='1rem'>Избери локация</Typography>
      <Grid container spacing={2}>
        {filteredLocations.map((item) => (
          <Grid item key={item.id} xs={12} md={6} lg={4} xl={3}>
            <LocationCard
              src={item.picture}
              title={item.name}
              description={item.subtitle}
              onClick={() => navigate(`/location/${item.id}`)}
            />
          </Grid>
        ))}
        {isFilterEmpty && <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_DATA} />}
        {isLocationsSuccess && isArrayEmptyOrNullish(locations) && (
          <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_LOCATIONS_IN_CATEGORY} />
        )}
      </Grid>
    </Fragment>
  );
};

export default Categories;
