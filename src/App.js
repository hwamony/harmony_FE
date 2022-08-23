import React from 'react';
import Navbar from './components/common/Navbar';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalStyle />
      <Navbar />
      <Router />
    </LocalizationProvider>
  );
};

export default App;
