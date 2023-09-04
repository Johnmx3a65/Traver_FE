import { useGetUsersQuery } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import { useEffect } from 'react';

export const useGetUsers = () => {
  const { data: users, isFetching, isSuccess, isError, refetch } = useGetUsersQuery();
  const { addLoading, removeLoading } = useActions();
  const ACTION_NAME = 'getUsers';

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
    users,
    isError,
    isSuccess,
    refetch,
  };
};
