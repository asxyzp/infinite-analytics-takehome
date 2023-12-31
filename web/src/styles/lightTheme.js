// IMPORTING PACKAGES/MODULES
import { createTheme } from '@mui/material/styles'

// LIGHT THEME
const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9b8aff',
      dark: 'rgb(129, 109, 255)',
      50: 'rgba(129, 109, 255, 0.05)',
      100: 'rgba(129, 109, 255, 0.1)',
      200: 'rgba(129, 109, 255, 0.2)',
      300: 'rgba(129, 109, 255, 0.3)',
      400: 'rgba(129, 109, 255, 0.4)',
      500: 'rgba(129, 109, 255, 0.5)',
      600: 'rgba(129, 109, 255, 0.6)',
      700: 'rgba(129, 109, 255, 0.7)',
      800: 'rgba(129, 109, 255, 0.8)',
      900: 'rgba(129, 109, 255, 0.9)',
    },
    secondary: {
      main: 'rgba(177,92,91,1)',
      dark: '#7e3533',
      50: 'rgba(177,92,91,0.05)',
      100: 'rgba(177,92,91,0.1)',
      200: 'rgba(177,92,91,0.2)',
      300: 'rgba(177,92,91,0.3)',
      400: 'rgba(177,92,91,0.4)',
      500: 'rgba(177,92,91,0.5)',
      600: 'rgba(177,92,91,0.6)',
      700: 'rgba(177,92,91,0.7)',
      800: 'rgba(177,92,91,0.8)',
      900: 'rgba(177,92,91,0.9)',
    },
    grey: {
      main: '#EDE7E3',
      dark: '#aba59f',
      50: '#fbf8f7',
      100: '#f4eee9',
      200: '#ebe7e4',
      300: '#dcc0b8',
      400: '#d1a9a0',
      500: '#c5938a',
      600: '#b87c73',
      700: '#ac665c',
      800: '#a05045',
      900: '#93392e',
    },
    info: {
      main: 'rgba(2,136,209,1)',
      dark: '#01579b',
      50: 'rgba(2,136,209,0.05)',
      100: 'rgba(2,136,209,0.1)',
      200: 'rgba(2,136,209,0.2)',
      300: 'rgba(2,136,209,0.3)',
      400: 'rgba(2,136,209,0.4)',
      500: 'rgba(2,136,209,0.5)',
      600: 'rgba(2,136,209,0.6)',
      700: 'rgba(2,136,209,0.7)',
      800: 'rgba(2,136,209,0.8)',
      900: 'rgba(2,136,209,0.9)',
    },
    warning: {
      main: 'rgba(237,108,2,1)',
      dark: '#e65100',
      50: 'rgba(237,108,2,0.05)',
      100: 'rgba(237,108,2,0.1)',
      200: 'rgba(237,108,2,0.2)',
      300: 'rgba(237,108,2,0.3)',
      400: 'rgba(237,108,2,0.4)',
      500: 'rgba(237,108,2,0.5)',
      600: 'rgba(237,108,2,0.6)',
      700: 'rgba(237,108,2,0.7)',
      800: 'rgba(237,108,2,0.8)',
      900: 'rgba(237,108,2,0.9)',
    },
    error: {
      main: 'rgba(211,47,47,1)',
      dark: '#c62828',
      50: 'rgba(211,47,47,0.05)',
      100: 'rgba(211,47,47,0.1)',
      200: 'rgba(211,47,47,0.2)',
      300: 'rgba(211,47,47,0.3)',
      400: 'rgba(211,47,47,0.4)',
      500: 'rgba(211,47,47,0.5)',
      600: 'rgba(211,47,47,0.6)',
      700: 'rgba(211,47,47,0.7)',
      800: 'rgba(211,47,47,0.8)',
      900: 'rgba(211,47,47,0.9)',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    logo: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: '900',
      fontSize: '1.4rem',
    },
    h1: {
      fontFamily: 'Raleway',
    },
    h2: {
      fontFamily: 'Raleway',
    },
    h3: {
      fontFamily: 'Raleway',
    },
    h4: {
      fontFamily: 'Raleway',
    },
    h5: {
      fontFamily: 'Raleway',
    },
    h6: {
      fontFamily: 'Raleway',
    },
    body1: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 16,
    },
    body2: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 12,
    },
  },
})

export default LightTheme
