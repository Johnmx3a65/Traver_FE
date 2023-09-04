import { configureStore } from '@reduxjs/toolkit';
import { traverApi } from './traver/traver.api';
import { traverReducer } from './traver/traver.slice';
import { unauthenticatedMiddleware } from './traver/unauthenticatedMiddleware';

export const store = configureStore({
  reducer: {
    [traverApi.reducerPath]: traverApi.reducer,
    traver: traverReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([unauthenticatedMiddleware, traverApi.middleware]),
});
