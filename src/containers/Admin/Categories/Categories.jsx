import React, { Fragment, useRef, useState } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import styles from './Categories.module.css';
import TraverSearch from '../../../components/TraverSearch/TraverSearch';
import CategoryDialog from '../../../components/CategoryDialog/CategoryDialog';
import DeleteDialog from '../../../components/DeleteDialog/DeleteDialog';
import useFilter from '../../../hooks/filter';
import IllustratedMessage from '../../../components/IllustratedMessage/IllustratedMessage';
import AdminCategoryCard from '../../../components/AdminCategoryCard/AdminCategoryCard';
import { useAddCategory } from '../../../hooks/category/addCategory';
import { useEditCategory } from '../../../hooks/category/editCategory';
import { useDeleteCategory } from '../../../hooks/category/deleteCategory';
import { useGetCategories } from '../../../hooks/category/getCategories';
import {
  DELETE_CATEGORY_DIALOG_TEXT,
  DELETE_CATEGORY_DIALOG_TITLE,
  ILLUSTRATED_MESSAGE_NO_ADDED_CATEGORIES,
  ILLUSTRATED_MESSAGE_NO_DATA,
  SEARCH_CATEGORY,
} from '../../../utils/constraints';
import { isArrayEmptyOrNullish } from '../../../utils/util';

const Categories = () => {
  const categoryRef = useRef(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { categories, isSuccess, isError, refetch: getData } = useGetCategories();
  const { filteredItems: filteredCategories, isFilterEmpty, searchHandler } = useFilter(categories, 'name');
  const { addCategory } = useAddCategory();
  const { editCategory } = useEditCategory();
  const { deleteCategory } = useDeleteCategory();

  const handleSubmitAddDialog = (newCategoryData) => {
    setUpdateDialogOpen(false);
    addCategory(newCategoryData).finally(() => getData());
  };

  const handleSubmitUpdateDialog = (newCategoryData) => {
    setUpdateDialogOpen(false);
    editCategory(newCategoryData).finally(() => getData());
  };

  const handleSubmitDeleteDialog = () => {
    setDeleteDialogOpen(false);
    deleteCategory(categoryRef.current.id).finally(() => getData());
  };

  if (isError) {
    return <IllustratedMessage />;
  }

  return (
    <Fragment>
      <CategoryDialog
        open={updateDialogOpen}
        category={categoryRef.current}
        onClose={() => setUpdateDialogOpen(false)}
        onAdd={handleSubmitAddDialog}
        onEdit={handleSubmitUpdateDialog}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSubmit={handleSubmitDeleteDialog}
        title={DELETE_CATEGORY_DIALOG_TITLE}
        text={DELETE_CATEGORY_DIALOG_TEXT(categoryRef.current?.name)}
      />
      <Container maxWidth='xxl' className={styles.categoriesContainer}>
        <Grid container className={styles.searchContainer} columnSpacing={1}>
          <Grid item xs={6} sm={4}>
            <TraverSearch placeholder={SEARCH_CATEGORY} onSearch={searchHandler} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box className={styles.addButtonContainer}>
              <Button
                className={styles.addButton}
                onClick={() => {
                  categoryRef.current = null;
                  setUpdateDialogOpen(true);
                }}
              >
                Добави категория
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filteredCategories?.map((c, i) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={`category-${i}`}>
              <AdminCategoryCard
                category={c}
                onEdit={() => {
                  categoryRef.current = c;
                  setUpdateDialogOpen(true);
                }}
                onDelete={() => {
                  categoryRef.current = c;
                  setDeleteDialogOpen(true);
                }}
              />
            </Grid>
          ))}
          {isFilterEmpty && <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_DATA} />}
          {isSuccess && isArrayEmptyOrNullish(categories) && (
            <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_CATEGORIES} />
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Categories;
