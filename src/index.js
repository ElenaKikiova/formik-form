import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Set dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);