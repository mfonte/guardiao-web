/**
 * Tema MUI v6 com Material Design 3.
 * Suporta light/dark mode via PaletteMode.
 */

import { createTheme, type ThemeOptions, type PaletteMode } from '@mui/material/styles';

const baseOptions: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
};

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: { main: '#1976d2' },
  secondary: { main: '#9c27b0' },
  background: {
    default: '#f5f5f7',
    paper: '#ffffff',
  },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: { main: '#90caf9' },
  secondary: { main: '#ce93d8' },
  background: {
    default: '#0a0a0a',
    paper: '#1a1a1a',
  },
};

export function buildTheme(mode: PaletteMode) {
  return createTheme({
    ...baseOptions,
    palette: mode === 'dark' ? darkPalette : lightPalette,
  });
}
