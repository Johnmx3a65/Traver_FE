import React, { Fragment } from 'react';
import styles from './LocationDetail.module.css';
import { Box, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
import IllustratedMessage from '../../components/IllustratedMessage/IllustratedMessage';
import { ILLUSTRATED_MESSAGE_NO_DATA } from '../../utils/constraints';
import { useGetLocation } from '../../hooks/location/getLocation';
import { useGetPathId } from '../../hooks/getPathId';
import { useGetPhotos } from '../../hooks/photo/getPhotos';
import { useNavigate } from 'react-router-dom';
import { useToggleFavoriteLocation } from '../../hooks/location/toggleFavoriteLocation';
import { useTogglePhotoModal } from '../../hooks/photo/togglePhotoModal';

const LocationDetails = () => {
  const navigate = useNavigate();
  const { id } = useGetPathId('location');
  const { center, location, isSuccess: isLocationSuccess, isError: isLocationError } = useGetLocation(id);
  const { photos } = useGetPhotos(id);
  const { isFavorite, toggleFavorite } = useToggleFavoriteLocation(location);
  const { photo, isModalOpen, onPhotoClick } = useTogglePhotoModal();

  if (isLocationError) {
    return <IllustratedMessage />;
  }

  if (isLocationSuccess && !location) {
    return <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_DATA} />;
  }

  return (
    <Fragment>
      <PhotoModal photo={photo} open={isModalOpen} onClose={onPhotoClick} />
      <Box display='flex' justifyContent='space-between' marginBottom='1rem'>
        <ArrowBackIcon onClick={() => navigate(-1)} className={styles.arrowBack} />
        <Typography variant='h5' component='h5'>
          {location?.name}
        </Typography>
        <Box component='span' className={styles.favoriteIcon} onClick={toggleFavorite}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Box>
      </Box>
      <Box component='img' src={location?.picture} alt={location?.name} className={styles.locationPhoto} />
      <Typography variant='h5' component='h5' marginBottom='0.5rem'>
        Описание
      </Typography>
      <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
        {location?.description}
      </Typography>
      {photos?.length > 0 && (
        <Box marginBottom='1rem'>
          <Typography variant='h5' component='h5' marginBottom='0.5rem'>
            Снимки
          </Typography>
          <Box className={styles.photosContainer}>
            {photos?.map((item, i) => (
              <Box key={'photo- ' + item.id} paddingRight='0.5rem' onClick={() => onPhotoClick(item)}>
                <img src={item.previewUrl} alt={'img-' + i} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {center && (
        <Fragment>
          <Typography variant='h5' component='h5' marginBottom='0.5rem'>
            Точно място
          </Typography>
          <Box display='flex' flexDirection='row' height='500px'>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyAiwj0N_l_1uepEWDcMP-LiQxciXrtHfVc',
                language: 'bg',
              }}
              defaultZoom={12}
              center={center}
            >
              <PlaceIcon lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LocationDetails;
