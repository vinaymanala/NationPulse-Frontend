import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    padding: string;
    textColor: string;
    borderRadius?: string;
    titleColor: string;
    subtleColor: string;
    logoPadding: {
      padding: string;
    };
    menuTitle: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      letterSpacing: string;
    };
    heightBoxTop: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    padding?: string;
    textColor?: string;
    borderRadius?: string;
    titleColor?: string;
    subtleColor?: string;
    logoPadding?: {
      padding: string;
    };
    menuTitle?: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      letterSpacing: string;
    };
    heightBoxTop?: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#101d40',
      light: '#fff',
    },
    secondary: {
      // main: '#f15a24',
      main: '#586179',
    },
    background: {
      default: '#fff',
    },
  },
  logoPadding: {
    padding: '2rem 2.5rem',
  },
  menuTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '1.5rem',
    letterSpacing: '-0.48px',
  },
  padding: '1.5rem',
  heightBoxTop: '5.2rem',
  titleColor: '#101d40',
  subtleColor: '#101d40',
  borderRadius: '4px',
  typography: {
    fontFamily: 'Noto Sans, Sans-Serif',
    h1: {
      fontWeight: 900,
      fontSize: '2.75rem',
      letterSpacing: '-1.2px',
      lineHeight: '1.7rem',
    },
    h2: {
      fontWeight: 800,
      fontSize: '1.5rem',
      letterSpacing: '-0.72px',
      lineHeight: '1.17rem',
    },
    h3: {
      fontWeight: 400,
      fontSize: '100%',
      letterSpacing: '-0.48px',
      lineHeight: '24px',
    },
    h4: {
      // fontFamily: 'Noto Sans Bold',
      fontWeight: 700,
      fontSize: '0.875rem',
      letterSpacing: '-0.42px',
      lineHeight: '1.43px',
    },
  },
});

export const useTheme = () => theme;
