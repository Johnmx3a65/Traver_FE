import { useGetCategoriesQuery, useGetFavouriteCategoriesQuery } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import { useEffect, useState } from 'react';
import { isArrayEmptyOrNullish } from '../../utils/util';

export const useGetCategories = (isFavoriteMode = false) => {
  const [category, setCategory] = useState(null);
  const {
    data: categories,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = isFavoriteMode ? useGetFavouriteCategoriesQuery() : useGetCategoriesQuery();
  const { addLoading, removeLoading } = useActions();
  const ACTION_NAME = 'getCategories';

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
    if (!isArrayEmptyOrNullish(categories)) {
      setCategory(categories[0]);
    }
  }, [categories]);

  return {
    category,
    categories,
    isSuccess,
    isError,
    setCategory,
    refetch,
  };
};
