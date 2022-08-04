import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.scss';
import App from './app/App';
import 'bootstrap/dist/js/bootstrap.min.js';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#f58320",
      contrastText: '#fff'
    },
    // secondary: {
    //   main: "#ffcc80"
    // }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
