import React from 'react';
import SideBarNav from '@shared/nav/SideBarNav';
import Box from '@mui/material/Box';
import { theme } from '@shared/styles/theme';

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box component={'main'} sx={{ display: 'flex' }}>
      <SideBarNav />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: theme.heightBoxTop,
          padding: 0,
          transition: 'all 0.25s ease-in-out',
          position: 'relative',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
