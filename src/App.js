import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalStyle />
      <Router />
    </LocalizationProvider>
  );
};

export default App;
