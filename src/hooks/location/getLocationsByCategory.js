import { useLazyGetFavouriteLocationsQuery, useLazyGetLocationsQuery } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import { useEffect } from 'react';

export const useGetLocationsByCategory = (category, isFavoriteMode = false) => {
  const [getLocations, { data: locations, isFetching, isError, isSuccess }] = isFavoriteMode
    ? useLazyGetFavouriteLocationsQuery()
    : useLazyGetLocationsQuery();
  const { addLoading, removeLoading } = useActions();
  const ACTION_NAME = 'getLocationsByCategory';

  useEffect(() => {
    if (isFetching) {
      addLoading(ACTION_NAME);
    } else {
      removeLoading(ACTION_NAME);
    }
  }, [isFetching]);

  useEffect(() => {
    if (category && category.id) {
      getLocations(category.id);
    }
  }, [category]);

  return {
    locations,
    isSuccess,
    isError,
  };
};
