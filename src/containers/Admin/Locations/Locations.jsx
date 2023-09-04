import React, { Fragment, useRef, useState } from 'react';
import styles from './Locations.module.css';
import { Box, Button, Container, Grid } from '@mui/material';
import LocationDialog from '../../../components/LocationDialog/LocationDialog';
import TraverSearch from '../../../components/TraverSearch/TraverSearch';
import DeleteDialog from '../../../components/DeleteDialog/DeleteDialog';
import useFilter from '../../../hooks/filter';
import IllustratedMessage from '../../../components/IllustratedMessage/IllustratedMessage';
import AdminLocationCard from '../../../components/AdminLocationCard/AdminLocationCard';
import { useAddLocation } from '../../../hooks/location/addLocation';
import { useEditLocation } from '../../../hooks/location/editLocation';
import { useDeleteLocation } from '../../../hooks/location/deleteLocation';
import {
  DELETE_LOCATION_DIALOG_TEXT,
  DELETE_LOCATION_DIALOG_TITLE,
  ILLUSTRATED_MESSAGE_NO_ADDED_LOCATIONS,
  ILLUSTRATED_MESSAGE_NO_DATA,
  SEARCH_LOCATION,
} from '../../../utils/constraints';
import { isArrayEmptyOrNullish } from '../../../utils/util';
import { useGetLocations } from '../../../hooks/location/getLocations';
import { useGetCategories } from '../../../hooks/category/getCategories';

const Locations = () => {
  const [updateLocationDialogOpen, setUpdateLocationDialogOpen] = useState(false);
  const [deleteLocationDialogOpen, setDeleteLocationDialogOpen] = useState(false);

  const location = useRef(null);
  const {
    locations,
    isSuccess: isLocationsSuccess,
    isError: isLocationsError,
    refetch: refreshLocations,
  } = useGetLocations();
  const { categories, isError: isCategoriesError } = useGetCategories();

  const { filteredItems: filteredLocations, isFilterEmpty, searchHandler } = useFilter(locations, 'name');

  const { addLocation } = useAddLocation();
  const { editLocation } = useEditLocation();
  const { deleteLocation } = useDeleteLocation();

  const handleLocationDialogSubmit = (newLocationData) => {
    setUpdateLocationDialogOpen(false);
    addLocation(newLocationData).finally(() => refreshLocations());
  };

  const handleLocationDialogEdit = (newLocationData) => {
    setUpdateLocationDialogOpen(false);
    editLocation(newLocationData).finally(() => refreshLocations());
  };

  const handleLocationDialogDelete = () => {
    setDeleteLocationDialogOpen(false);
    deleteLocation(location.current.id).finally(() => refreshLocations());
  };

  if (isLocationsError || isCategoriesError) {
    return <IllustratedMessage />;
  }

  return (
    <Fragment>
      <LocationDialog
        open={updateLocationDialogOpen}
        location={{ categories, ...location.current }}
        onClose={() => setUpdateLocationDialogOpen(false)}
        onAdd={handleLocationDialogSubmit}
        onEdit={handleLocationDialogEdit}
      />
      <DeleteDialog
        open={deleteLocationDialogOpen}
        onClose={() => setDeleteLocationDialogOpen(false)}
        onSubmit={handleLocationDialogDelete}
        title={DELETE_LOCATION_DIALOG_TITLE}
        text={DELETE_LOCATION_DIALOG_TEXT(location.current?.name)}
      />
      <Container maxWidth='xxl' className={styles.locationsContainer}>
        <Grid container className={styles.searchContainer} columnSpacing={1}>
          <Grid item xs={6} sm={4}>
            <TraverSearch placeholder={SEARCH_LOCATION} onSearch={searchHandler} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box className={styles.addButtonContainer}>
              <Button
                className={styles.addButton}
                onClick={() => {
                  location.current = null;
                  setUpdateLocationDialogOpen(true);
                }}
              >
                Добави локация
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filteredLocations?.map((l, i) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={`location-${i}`}>
              <AdminLocationCard
                categories={categories}
                location={l}
                onEdit={() => {
                  location.current = l;
                  setUpdateLocationDialogOpen(true);
                }}
                onDelete={() => {
                  location.current = l;
                  setDeleteLocationDialogOpen(true);
                }}
              />
            </Grid>
          ))}
          {isFilterEmpty && <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_DATA} />}
          {isLocationsSuccess && isArrayEmptyOrNullish(locations) && (
            <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_LOCATIONS} />
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Locations;
