import {
  AppBar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { theme } from '@shared/styles/theme';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SideBarNav({ children }: { children?: React.ReactNode }) {
  const [openNav, setOpenNav] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const isMobile = windowWidth < 768;

  useEffect(() => {
    console.log('Window width:', windowWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    if (isMobile) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const menus = [
    { id: 0, text: 'Dashboard', link: '/' },
    { id: 1, text: 'Population', link: '/population' },
    { id: 2, text: 'Health', link: '/health' },
    { id: 3, text: 'Economy', link: '/economy' },
    { id: 5, text: 'Reporting', link: '/reporting' },
  ];

  const drawerWidth = 280;

  const handleNavOpenClose = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    if (
      e.type === 'keydown' &&
      ((e as React.KeyboardEvent).key === 'Tab' ||
        (e as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpenNav((prev) => !prev);
  };
  return (
    <>
      <AppBar
        position={isMobile ? 'absolute' : 'fixed'}
        sx={{
          left: openNav ? `${drawerWidth}px` : 0,
          width: openNav ? `calc(100% - ${drawerWidth}px)` : '100%',
          transition: 'all 0.25s ease-in-out',
          height: theme.heightBoxTop,
          // padding: theme.logoPadding.padding,
          backgroundColor: theme.palette.primary.main,
          color: theme.titleColor,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.subtleColor}`,
        }}
      >
        {isMobile ? (
          <Typography variant="h1" padding={theme.padding} gutterBottom>
            <button onClick={(e) => handleNavOpenClose(e)}>NationPulse</button>
          </Typography>
        ) : null}
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        sx={{
          width: openNav ? drawerWidth : '0%',
          transition: 'all 0.25s ease-in-out',
          zIndex: isMobile ? 1200 : 'auto',
          flexShrink: 0,
          backgroundColor: theme.palette.primary.main,
          height: '4.3rem',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: isMobile ? '2px 0px 8px rgba(0, 0, 0, 0.1)' : 'none',
          },
        }}
        open={openNav}
      >
        <Typography
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="h2"
          padding={theme.logoPadding.padding}
        >
          {/* <button onClick={() => setOpenNav((prev) => !prev)}>
          </button> */}
          NationPulse
        </Typography>
        <Divider />
        {/* Add navigation items here */}
        <List>
          {menus.map((menu, _) => (
            <ListItem key={menu.id} disablePadding>
              <ListItemButton
                disableTouchRipple
                onClick={() => navigate(menu.link)}
              >
                <ListItemIcon>{'$'}</ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      ...theme.menuTitle,
                      color: theme.titleColor,
                    }}
                  >
                    {menu.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {children}
      </Drawer>
    </>
  );
}

export default SideBarNav;
