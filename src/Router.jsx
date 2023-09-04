import { Outlet, Route, Routes } from 'react-router-dom';
import React, { Fragment } from 'react';
import { Box, Container, Paper } from '@mui/material';
import TraverNavbar from './components/TraverNavbar/TraverNavbar';
import styles from './App.module.css';
import SignUp from './containers/SignUp/SignUp';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import Users from './containers/Admin/Users/Users';
import Photos from './containers/Admin/Photos/Photos';
import Locations from './containers/Locations/Locations';
import LocationDetails from './containers/LocationDetails/LocationDetails';
import Categories from './containers/Categories/Categories';
import NotFound from './containers/NotFound/NotFound';
import LocationsAdmin from './containers/Admin/Locations/Locations';
import CategoriesAdmin from './containers/Admin/Categories/Categories';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';

const WithNav = ({ isAdminPage }) => {
  return (
    <Fragment>
      <Box marginBottom='64px'>
        <TraverNavbar isAdminPage={isAdminPage} />
      </Box>
      {isAdminPage && <Outlet />}
      {!isAdminPage && (
        <Box className={styles.content}>
          <Container maxWidth='xl'>
            <Paper sx={{ padding: '20px', minHeight: '500px' }}>
              <Outlet />
            </Paper>
          </Container>
        </Box>
      )}
    </Fragment>
  );
};

const WithoutNav = () => {
  return <Outlet />;
};

const Router = () => (
  <Routes>
    <Route element={<WithoutNav />}>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Route>
    <Route element={<WithNav isAdminPage />}>
      <Route path='/admin/users' element={<Users />} />
      <Route path='/admin/locations' element={<LocationsAdmin />} />
      <Route path='/admin/categories' element={<CategoriesAdmin />} />
      <Route path='/admin/photos' element={<Photos />} />
    </Route>
    <Route element={<WithNav />}>
      <Route path='/' element={<Home />} />
      <Route path='/locations' element={<Locations />} />
      <Route path='/location/:id' element={<LocationDetails />} />
      <Route path='/categories' element={<Categories />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default Router;
