import React, { Fragment, useRef, useState } from 'react';
import styles from './Users.module.css';
import { Box, Button, Container, Grid } from '@mui/material';
import UserDialog from '../../../components/UserDialog/UserDialog';
import { isArrayEmptyOrNullish, roles } from '../../../utils/util';
import TraverSearch from '../../../components/TraverSearch/TraverSearch';
import DeleteDialog from '../../../components/DeleteDialog/DeleteDialog';
import useFilter from '../../../hooks/filter';
import IllustratedMessage from '../../../components/IllustratedMessage/IllustratedMessage';
import AdminUserCard from '../../../components/AdminUserCard/AdminUserCard';
import { useGetUsers } from '../../../hooks/users/getUsers';
import { useAddUser } from '../../../hooks/users/addUser';
import { ILLUSTRATED_MESSAGE_NO_ADDED_USERS, ILLUSTRATED_MESSAGE_NO_DATA } from '../../../utils/constraints';
import { useEditUser } from '../../../hooks/users/editUser';
import { useDeleteUser } from '../../../hooks/users/deleteUser';

const Users = () => {
  const userRef = useRef(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { users, isSuccess, isError, refetch: getData } = useGetUsers();
  const { filteredItems: filteredUsers, isFilterEmpty, searchHandler } = useFilter(users, 'email');

  const { addUser } = useAddUser();
  const { editUser } = useEditUser();
  const { deleteUser } = useDeleteUser();

  const handleSubmitAddDialog = (newUserData) => {
    setUpdateDialogOpen(false);
    addUser(newUserData).finally(() => getData());
  };

  const handleSubmitUpdateDialog = (newUserData) => {
    setUpdateDialogOpen(false);
    editUser(newUserData).finally(() => getData());
  };

  const handleSubmitDeleteDialog = () => {
    setDeleteDialogOpen(false);
    deleteUser(userRef.current.id).finally(() => getData());
  };

  if (isError) {
    return <IllustratedMessage />;
  }

  return (
    <Fragment>
      <UserDialog
        open={updateDialogOpen}
        user={{ roles, ...userRef.current }}
        onClose={() => setUpdateDialogOpen(false)}
        onAdd={handleSubmitAddDialog}
        onEdit={handleSubmitUpdateDialog}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSubmit={handleSubmitDeleteDialog}
        title={'Изтрий потребител'}
        text={`Сигурни ли сте че искате да изтриите потребител ${userRef.current?.email}`}
      />
      <Container maxWidth='xxl' className={styles.usersContainer}>
        <Grid container className={styles.searchContainer} columnSpacing={1}>
          <Grid item xs={6} sm={4}>
            <TraverSearch placeholder='Търси потребител' onSearch={searchHandler} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box className={styles.addButtonContainer}>
              <Button
                className={styles.addButton}
                onClick={() => {
                  userRef.current = null;
                  setUpdateDialogOpen(true);
                }}
              >
                Добави потребител
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filteredUsers?.map((u, i) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={`user-${i}`}>
              <AdminUserCard
                user={u}
                onEdit={() => {
                  userRef.current = u;
                  setUpdateDialogOpen(true);
                }}
                onDelete={() => {
                  userRef.current = u;
                  setDeleteDialogOpen(true);
                }}
              />
            </Grid>
          ))}
          {isFilterEmpty && <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_DATA} />}
          {isSuccess && isArrayEmptyOrNullish(users) && (
            <IllustratedMessage type='empty' message={ILLUSTRATED_MESSAGE_NO_ADDED_USERS} />
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Users;
