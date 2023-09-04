import { createSlice } from '@reduxjs/toolkit';

const LS_TRAVER_USER_KEY = 'traver_user';

const initialState = {
  loadingStack: [],
  alertType: '',
  alertMessage: '',
  alertOpen: false,
  user: JSON.parse(localStorage.getItem(LS_TRAVER_USER_KEY) ?? '{}'),
};

export const traverSlice = createSlice({
  name: 'traver',
  initialState,
  reducers: {
    resetState: () => initialState,
    setAlertType: (state, action) => {
      state.alertType = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    setAlertOpen: (state, action) => {
      state.alertOpen = action.payload;
    },
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(LS_TRAVER_USER_KEY, JSON.stringify(state.user));
    },
    addLoading: (state, action) => {
      const newSet = new Set(state.loadingStack);
      newSet.add(action.payload);
      state.loadingStack = [...newSet];
    },
    removeLoading: (state, action) => {
      const newSet = new Set(state.loadingStack);
      newSet.delete(action.payload);
      state.loadingStack = [...newSet];
    },
  },
});

export const traverActions = traverSlice.actions;
export const traverReducer = traverSlice.reducer;
