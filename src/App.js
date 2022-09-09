import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RouteChangeTracker from './utils/RouteChangeTracker';

const App = () => {
  RouteChangeTracker();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalStyle />
      <Router />
    </LocalizationProvider>
  );
};

export default App;
