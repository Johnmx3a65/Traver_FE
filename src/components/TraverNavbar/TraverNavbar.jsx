import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import TraverLogo from '../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './TraverNavbar.module.css';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../store/traver/traver.api';
import { useActions } from '../../hooks/actions';
import MenuIcon from '@mui/icons-material/Menu';
import { AdminNavItems, PublicNavItems } from './TraverNavbarShema';

const TraverNavbar = ({ isAdminPage, window }) => {
  const [publicItems, setPublicItems] = useState(PublicNavItems);
  const [adminItems, setAdminItems] = useState(AdminNavItems);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setCredentials } = useActions();
  const { user } = useSelector((state) => state.traver);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const currentLocation = location.pathname;
    if (currentLocation.includes('admin')) {
      if (user?.role !== 'ADMIN') {
        navigate('/access-denied');
        return;
      }
      setAdminItems((prev) =>
        prev.map((i) => {
          i.isActive = i.url === currentLocation;
          return i;
        }),
      );
    } else {
      if (user?.role !== 'USER' && user?.role !== 'ADMIN') {
        navigate('/login');
        return;
      }
      setPublicItems((prev) =>
        prev.map((i) => {
          i.isActive = i.url === currentLocation;
          return i;
        }),
      );
    }
  }, [location.pathname, user]);

  const logOutBtnHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        setCredentials(null);
      });
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setSideBarOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Traver
      </Typography>
      <Divider />
      <List>
        {(isAdminPage ? adminItems : publicItems).map((item, i) => (
          <ListItem key={`nav-item-${i}`} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.url)}>
              <ListItemText primary={item.isActive && item.title} secondary={!item.isActive && item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {(isAdminPage || user?.role === 'ADMIN') && (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                if (isAdminPage) {
                  navigate('/');
                  return;
                }
                navigate('/admin/users');
              }}
            >
              <ListItemText secondary={isAdminPage ? 'Публична част' : 'Админ част'} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={sideBarOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            <img src={TraverLogo} alt='Traver Logo' />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <span>
              {(isAdminPage ? adminItems : publicItems).map((item, index) => (
                <Button
                  onClick={() => navigate(item.url)}
                  key={`nav-item-${index}`}
                  color={item.isActive ? 'primary' : 'inherit'}
                  variant={item.isActive ? 'contained' : 'text'}
                  className={style.item}
                >
                  {item.title}
                </Button>
              ))}
              {isAdminPage && (
                <Button onClick={() => navigate('/')} color='inherit' className={style.item}>
                  Публична Част
                </Button>
              )}
              {!isAdminPage && user?.role === 'ADMIN' && (
                <Button onClick={() => navigate('/admin/users')} color='inherit' className={style.item}>
                  Админ Част
                </Button>
              )}
            </span>
            <Button onClick={logOutBtnHandler} color='inherit' className={style.item}>
              Изход
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TraverNavbar;
