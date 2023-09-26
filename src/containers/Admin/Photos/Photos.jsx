import React, { Fragment, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, Collapse, Container, Grid, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAlert from '../../../hooks/alert';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteDialog from '../../../components/DeleteDialog/DeleteDialog';
import PhotoDialog from '../../../components/PhotoDialog/PhotoDialog';
import AdminPhotoCard from '../../../components/AdminPhotoCard/AdminPhotoCard';
import TraverSearch from '../../../components/TraverSearch/TraverSearch';
import useFilter from '../../../hooks/filter';
import IllustratedMessage from '../../../components/IllustratedMessage/IllustratedMessage';
import ExpandButton from '../../../components/ExpandButton/ExpandButton';
import { isArrayEmptyOrNullish } from '../../../utils/util';
import { useAddPhoto } from '../../../hooks/photo/addPhoto';
import { useGetPhotos } from '../../../hooks/photo/getPhotos';
import { useGetLocations } from '../../../hooks/location/getLocations';
import { useEditPhoto } from '../../../hooks/photo/editPhoto';
import {
  ALERT_MESSAGE_ON_FAILURE,
  DELETE_PHOTO_DIALOG_TEXT,
  DELETE_PHOTO_DIALOG_TITLE,
  ILLUSTRATED_MESSAGE_NO_ADDED_LOCATIONS,
  ILLUSTRATED_MESSAGE_NO_ADDED_PHOTOS,
  ILLUSTRATED_MESSAGE_NO_DATA,
  SEARCH_LOCATION,
} from '../../../utils/constraints';
import { useDeletePhoto } from '../../../hooks/photo/deletePhoto';

const Photos = () => {
  const photo = useRef(null);
  const location = useRef(null);

  const [expandedLocationId, setExpandedLocationId] = useState(null);
  const [updatePhotoDialogOpen, setUpdatePhotoDialogOpen] = useState(false);
  const [deletePhotoDialogOpen, setDeletePhotoDialogOpen] = useState(false);

  const { locations, isSuccess: isLocationsSuccess, isError: isLocationsError } = useGetLocations();
  const { photos, isSuccess: isPhotosSuccess, isError: isPhotosError, refetch: refreshPhotos } = useGetPhotos();

  const { filteredItems: filteredLocations, isFilterEmpty, searchHandler } = useFilter(locations, 'name');

  const { addPhoto } = useAddPhoto();
  const { editPhoto } = useEditPhoto();
  const { deletePhoto } = useDeletePhoto();

  const openAlert = useAlert();

  const handlePhotoDialogSubmit = (newPhotoData) => {
    setUpdatePhotoDialogOpen(false);
    addPhoto(newPhotoData).finally(() => refreshPhotos(expandedLocationId));
  };

  const handlePhotoDialogEdit = (newPhotoData) => {
    setUpdatePhotoDialogOpen(false);
    editPhoto(newPhotoData).finally(() => refreshPhotos(expandedLocationId));
  };

  const handlePhotoDialogDelete = () => {
    setDeletePhotoDialogOpen(false);
    deletePhoto(photo.current.id).finally(() => refreshPhotos(expandedLocationId));
  };

  const handleExpandClick = (locationId) => {
    const selectedId = expandedLocationId !== locationId ? locationId : null;
    setExpandedLocationId(selectedId);

    if (selectedId) {
      refreshPhotos(locationId)
        .unwrap()
        .catch(() => openAlert(ALERT_MESSAGE_ON_FAILURE, 'error'));
    }
  };

  if (isLocationsError) {
    return <IllustratedMessage />;
  }

  if (isLocationsSuccess && isArrayEmptyOrNullish(locations)) {
    return <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_LOCATIONS} />;
  }

  return (
    <Fragment>
      <PhotoDialog
        open={updatePhotoDialogOpen}
        photo={{ locationId: location.current?.id, ...photo.current }}
        onClose={() => setUpdatePhotoDialogOpen(false)}
        onAdd={handlePhotoDialogSubmit}
        onEdit={handlePhotoDialogEdit}
      />
      <DeleteDialog
        open={deletePhotoDialogOpen}
        onClose={() => setDeletePhotoDialogOpen(false)}
        onSubmit={handlePhotoDialogDelete}
        title={DELETE_PHOTO_DIALOG_TITLE}
        text={DELETE_PHOTO_DIALOG_TEXT}
      />
      <Container maxWidth='xxl' sx={{ paddingTop: '1rem' }}>
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <TraverSearch placeholder={SEARCH_LOCATION} onSearch={searchHandler} />
          </Grid>
        </Grid>
        {locations !== null &&
          filteredLocations?.map((l, i) => (
            <Card key={`location-${i}`} sx={{ marginY: '2rem' }}>
              <CardHeader
                title={l.name}
                action={
                  <Fragment>
                    <Tooltip title={'Добави снимка'}>
                      <IconButton
                        onClick={() => {
                          location.current = l;
                          photo.current = null;
                          setUpdatePhotoDialogOpen(true);
                        }}
                      >
                        <AddAPhotoIcon />
                      </IconButton>
                    </Tooltip>
                    <ExpandButton
                      expand={l.id === expandedLocationId}
                      onClick={() => handleExpandClick(l.id)}
                      aria-expanded={l.id === expandedLocationId}
                      aria-label='show more'
                    >
                      <Tooltip title={l.id === expandedLocationId ? 'Скрий снимките' : 'Покажи снимки'}>
                        <ExpandMoreIcon />
                      </Tooltip>
                    </ExpandButton>
                  </Fragment>
                }
              />
              <Collapse in={l.id === expandedLocationId} timeout='auto' unmountOnExit>
                <CardContent>
                  <Grid container spacing={2}>
                    {photos !== null &&
                      photos?.map((p, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={`photo-${i}`}>
                          <AdminPhotoCard
                            photo={p}
                            onEdit={() => {
                              photo.current = p;
                              setUpdatePhotoDialogOpen(true);
                            }}
                            onDelete={() => {
                              photo.current = p;
                              setDeletePhotoDialogOpen(true);
                            }}
                          />
                        </Grid>
                      ))}
                    {isPhotosSuccess && isArrayEmptyOrNullish(photos) && (
                      <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_PHOTOS} />
                    )}
                    {isPhotosError && <IllustratedMessage />}
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        {isFilterEmpty && <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_DATA} />}
      </Container>
    </Fragment>
  );
};

export default Photos;
