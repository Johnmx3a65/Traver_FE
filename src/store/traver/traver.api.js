import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const traverApi = createApi({
  reducerPath: 'traverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    credentials: 'include',
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: 'auth/sign-out',
        method: 'POST',
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: 'auth/reset-password',
        method: 'PUT',
        body,
      }),
    }),
    sendVerificationCode: build.mutation({
      query: (body) => ({
        url: 'auth/send-verification-code',
        method: 'POST',
        body,
      }),
    }),
    checkVerificationCode: build.mutation({
      query: (body) => ({
        url: 'auth/check-verification-code',
        method: 'POST',
        body,
      }),
    }),
    getLocation: build.query({
      query: (id) => `location/${id}`,
    }),
    getLocations: build.query({
      query: (categoryId) => ({
        url: 'locations',
        params: { categoryId },
      }),
    }),
    addLocation: build.mutation({
      query: (body) => ({
        url: 'location',
        method: 'POST',
        body,
      }),
    }),
    editLocation: build.mutation({
      query: (body) => ({
        url: 'location',
        method: 'PUT',
        body,
      }),
    }),
    deleteLocation: build.mutation({
      query: (id) => ({
        url: `location/${id}`,
        method: 'DELETE',
      }),
    }),
    getFavouriteLocations: build.query({
      query: (categoryId) => ({
        url: 'locations/favourite',
        params: { categoryId },
      }),
    }),
    addFavoriteLocation: build.mutation({
      query: (id) => ({
        url: `location/favourite/${id}`,
        method: 'POST',
      }),
    }),
    deleteFavoriteLocation: build.mutation({
      query: (id) => ({
        url: `location/favourite/${id}`,
        method: 'DELETE',
      }),
    }),
    getPhotos: build.query({
      query: (id) => `photos/${id}`,
    }),
    addPhoto: build.mutation({
      query: (body) => ({
        url: 'photo',
        method: 'POST',
        body,
      }),
    }),
    editPhoto: build.mutation({
      query: (body) => ({
        url: 'photo',
        method: 'PUT',
        body,
      }),
    }),
    deletePhoto: build.mutation({
      query: (id) => ({
        url: `photo/${id}`,
        method: 'DELETE',
      }),
    }),
    getCategories: build.query({
      query: () => 'categories',
    }),
    getFavouriteCategories: build.query({
      query: () => 'categories/favorite',
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: 'category',
        method: 'POST',
        body,
      }),
    }),
    editCategory: build.mutation({
      query: (body) => ({
        url: 'category',
        method: 'PUT',
        body,
      }),
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
      }),
    }),
    getUsers: build.query({
      query: () => 'users',
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
    }),
    editUser: build.mutation({
      query: (body) => ({
        url: 'user',
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSendVerificationCodeMutation,
  useCheckVerificationCodeMutation,
  useGetLocationQuery,
  useGetLocationsQuery,
  useLazyGetLocationsQuery,
  useAddLocationMutation,
  useEditLocationMutation,
  useDeleteLocationMutation,
  useLazyGetFavouriteLocationsQuery,
  useAddFavoriteLocationMutation,
  useDeleteFavoriteLocationMutation,
  useGetPhotosQuery,
  useLazyGetPhotosQuery,
  useAddPhotoMutation,
  useEditPhotoMutation,
  useDeletePhotoMutation,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetFavouriteCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = traverApi;
