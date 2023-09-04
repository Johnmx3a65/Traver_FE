import React, { Fragment } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LocationCard from '../../components/LocationCard/LocationCard';
import TraverSearch from '../../components/TraverSearch/TraverSearch';
import IllustratedMessage from '../../components/IllustratedMessage/IllustratedMessage';
import { isArrayEmptyOrNullish } from '../../utils/util';
import { useGetLocations } from '../../hooks/location/getLocations';
import {
  ILLUSTRATED_MESSAGE_NO_ADDED_LOCATIONS,
  ILLUSTRATED_MESSAGE_NO_DATA,
  SEARCH_LOCATION,
} from '../../utils/constraints';
import useFilter from '../../hooks/filter';
import { useNavigate } from 'react-router-dom';

const Locations = () => {
  const navigate = useNavigate();
  const { locations, isError, isSuccess } = useGetLocations();
  const { filteredItems: filteredLocations, isFilterEmpty, searchHandler } = useFilter(locations, 'name');

  if (isError) {
    return <IllustratedMessage />;
  }

  if (isSuccess && isArrayEmptyOrNullish(locations)) {
    return <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_LOCATIONS} />;
  }

  return (
    <Fragment>
      <Typography marginBottom='1rem' textAlign='center' variant='h5' component='h5'>
        Локации
      </Typography>
      <Box marginBottom='1rem'>
        <TraverSearch onSearch={searchHandler} placeholder={SEARCH_LOCATION} />
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
      </Grid>
    </Fragment>
  );
};

export default Locations;
