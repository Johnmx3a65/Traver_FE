import React, { Fragment } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import styles from './Home.module.css';
import LocationCard from '../../components/LocationCard/LocationCard';
import { Link, useNavigate } from 'react-router-dom';
import TraverSearch from '../../components/TraverSearch/TraverSearch';
import IllustratedMessage from '../../components/IllustratedMessage/IllustratedMessage';
import useFilter from '../../hooks/filter';
import { isArrayEmptyOrNullish } from '../../utils/util';
import {
  ILLUSTRATED_MESSAGE_NO_DATA,
  ILLUSTRATED_MESSAGE_NO_FAVORITE_LOCATIONS,
  SEARCH_LOCATION,
} from '../../utils/constraints';
import { useGetCategories } from '../../hooks/category/getCategories';
import { useGetLocationsByCategory } from '../../hooks/location/getLocationsByCategory';

const Home = () => {
  const navigate = useNavigate();

  const {
    category,
    categories,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
    setCategory,
  } = useGetCategories(true);
  const { locations, isError: isLocationsError } = useGetLocationsByCategory(category, true);

  const { filteredItems: filteredLocations, isFilterEmpty, searchHandler } = useFilter(locations, 'name');

  if (isCategoriesError || isLocationsError) {
    return <IllustratedMessage />;
  }

  if (isCategoriesSuccess && isArrayEmptyOrNullish(categories)) {
    return (
      <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_FAVORITE_LOCATIONS}>
        <Button onClick={() => navigate('/locations')}>Добави</Button>
      </IllustratedMessage>
    );
  }

  return (
    <Fragment>
      <Typography marginBottom='1rem' textAlign='center' variant='h5' component='h5'>
        Дом
      </Typography>
      <Box marginBottom='1rem'>
        <TraverSearch onSearch={searchHandler} placeholder={SEARCH_LOCATION} />
      </Box>
      <Box display='flex' justifyContent='space-between' marginBottom='1rem'>
        <Typography>Избери категория</Typography>
        <Link className={styles.link} to={'/categories'}>
          Покажи всички
        </Link>
      </Box>
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
      <Box display='flex' justifyContent='space-between' marginBottom='1rem'>
        <Typography>Любими локации</Typography>
        <Link className={styles.link} to={'/locations'}>
          Покажи всички
        </Link>
      </Box>
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
      </Grid>
    </Fragment>
  );
};

export default Home;
