import { useLazyGetPhotosQuery } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import { useEffect } from 'react';

export const useGetPhotos = (locationId) => {
  const [getPhotos, { data: photos, isFetching, isError, isSuccess }] = useLazyGetPhotosQuery();
  const { addLoading, removeLoading } = useActions();
  const ACTION_NAME = 'getPhotos';

  useEffect(() => {
    if (isFetching) {
      addLoading(ACTION_NAME);
    } else {
      removeLoading(ACTION_NAME);
    }
  }, [isFetching]);

  useEffect(() => {
    if (locationId) {
      getPhotos(locationId);
    }
  }, [locationId]);

  return {
    photos,
    isSuccess,
    isError,
    refetch: getPhotos,
  };
};
