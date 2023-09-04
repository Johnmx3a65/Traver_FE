import { useAddFavoriteLocationMutation, useDeleteFavoriteLocationMutation } from '../../store/traver/traver.api';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESS } from '../../utils/constraints';
import { useEffect, useState } from 'react';
import { useActions } from '../actions';

export const useToggleFavoriteLocation = (location) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const [addFavoriteLocation] = useAddFavoriteLocationMutation();
  const [deleteFavoriteLocation] = useDeleteFavoriteLocationMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'toggleFavoriteLocation';

  useEffect(() => {
    setIsFavorite(location?.isFavorite);
  }, [location]);

  const toggleFavorite = () => {
    const promise = isFavorite
      ? deleteFavoriteLocation(location?.id).unwrap()
      : addFavoriteLocation(location?.id).unwrap();

    addLoading(ACTION_NAME);
    promise
      .then(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_SUCCESS, 'success');
        setIsFavorite(!isFavorite);
      })
      .catch(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
      });
  };

  return {
    isFavorite,
    toggleFavorite,
  };
};
