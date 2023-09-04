import { useGetLocationQuery } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import { useEffect, useState } from 'react';

export const useGetLocation = (id) => {
  const [center, setCenter] = useState(null);

  const { data: location, isFetching, isSuccess, isError } = useGetLocationQuery(id);
  const { addLoading, removeLoading } = useActions();
  const ACTION_NAME = 'getLocation';

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

  useEffect(() => {
    if (location) {
      setCenter({
        lat: Number.parseFloat(location?.coordinates.split(';')[0]),
        lng: Number.parseFloat(location?.coordinates.split(';')[1]),
      });
    }
  }, [location]);

  return {
    center,
    location,
    isSuccess,
    isError,
  };
};
