import { useAuth } from '@app/context';
import {
  Alert,
  AppBar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Typography,
} from '@mui/material';
import { SigninDialog } from '@shared/components/SigninDialog';
import { userUserSignOut } from '@shared/hooks/useUser';
import { theme } from '@shared/styles/theme';
import type { ModulePermissions } from '@shared/types/common';
import { GetUserModules } from '@shared/utils/permissions';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import KeyIcon from '@mui/icons-material/Key';
import { subscribeReportEvent } from '@shared/utils/utils';

function SideBarNav({ children }: { children?: React.ReactNode }) {
  const [openNav, setOpenNav] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [permissionedModules, setPermissionedModules] = useState<
    ModulePermissions[]
  >([]);
  const auth = useAuth();
  const [isUserSignedIn, setIsUserSignIn] = useState(false);
  const navigate = useNavigate();
  const isMobile = windowWidth < 768;
  let permissions: number[] = [];
  try {
    const raw = localStorage.getItem('permissions');
    permissions = raw ? JSON.parse(raw) : [];
  } catch (e) {
    permissions = [];
  }

  const { isPending: isUserSignOutPending, mutate: mutateSignOut } =
    userUserSignOut();

  useEffect(() => {
    // console.log('Window width:', windowWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    if (isMobile) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    setIsUserSignIn(!!auth.signedInUser?.signin);
    const modules = GetUserModules(
      permissions.length ? permissions : ([] as any)
    );
    setPermissionedModules(modules);
  }, [!!auth.signedInUser?.signin, !!localStorage.getItem('permissions')]);

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

  const handleSignOut = () => {
    auth.signout(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
      mutateSignOut();
      navigate('/');
    });
  };

  const moduleIcons: any = {
    Dashboard: <PublicIcon />,
    Population: <GroupsIcon />,
    Health: <HealthAndSafetyIcon />,
    Economy: <ShowChartIcon />,
    Reports: <SummarizeIcon />,
    Permissions: <KeyIcon />,
  };

  const handleSnackbarClose = () => {
    auth.setOpenReportStatus({
      ...auth.openReportStatus,
      open: false,
    });
  };
  const vertical = 'bottom';
  const horizontal = 'right';
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            position: 'absolute',
            right: '3rem',
            top: '1.5rem',
          }}
        >
          <Button
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.light,
              cursor: 'pointer',
            }}
            variant="outlined"
            // onClick={() => window.open('https://docs.nationpulse.com', '_blank')}
          >
            Read the Documentation
          </Button>
          <Button
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.light,
              cursor: 'pointer',
            }}
            variant="outlined"
            onClick={() =>
              isUserSignedIn ? handleSignOut() : setDialogOpen(true)
            }
            loading={isUserSignOutPending}
          >
            {isUserSignedIn ? 'Signout' : 'Signin'}
          </Button>
        </div>
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
          {permissionedModules.map((m, _) => (
            <ListItem key={m.moduleID} disablePadding>
              <ListItemButton
                disableTouchRipple
                onClick={() => navigate(m.path)}
              >
                <ListItemIcon>{moduleIcons[m.moduleName]}</ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      ...theme.menuTitle,
                      color: theme.titleColor,
                    }}
                  >
                    {m.moduleName}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {children}
      </Drawer>
      <SigninDialog
        open={dialogOpen}
        handleDialogClose={() => setDialogOpen((prevState) => !prevState)}
      />
      <Snackbar
        open={auth.openReportStatus.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical, horizontal }}
        // message={auth.openReportStatus.message}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={auth.openReportStatus.type as any}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {auth.openReportStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SideBarNav;
