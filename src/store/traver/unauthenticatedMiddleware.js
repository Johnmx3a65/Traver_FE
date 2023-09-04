import { isRejectedWithValue } from '@reduxjs/toolkit';
import { traverActions } from './traver.slice';

export const unauthenticatedMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(traverActions.resetState());
      window.location.replace('/login');
    }
    return next(action);
  };
