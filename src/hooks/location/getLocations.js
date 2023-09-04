import { useGetLocationsQuery } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import { useEffect } from 'react';

export const useGetLocations = () => {
  const { data: locations, isFetching, isError, isSuccess, refetch } = useGetLocationsQuery();
  const { addLoading, removeLoading } = useActions();
  const ACTION_NAME = 'getLocations';

  useEffect(() => {
    if (isFetching) {
      addLoading(ACTION_NAME);
    } else {
      removeLoading(ACTION_NAME);
    }
    return () => {
      removeLoading(ACTION_NAME);
    };
  }, [isFetching]);

  return {
    locations,
    isError,
    isSuccess,
    refetch,
  };
};
