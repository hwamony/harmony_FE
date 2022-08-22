import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Navbar from './components/common/Navbar';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import api from './api/AxiosManager';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, actions } = useAuth();

  useEffect(() => {
    console.log('로그인 상태:', isLoggedIn);
    const hasToken = localStorage.getItem('TOKEN');
    if (hasToken) {
      actions.onLoggedIn();
    } else {
      actions.onLoggedOut();
      navigate('/login');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    isLoggedIn && infoGet();
  }, [isLoggedIn]);

  const infoGet = async () => {
    try {
      const response = await api.get('/user/info');
      const { hasRole, isFamily } = response.data.data;
      console.log(hasRole, isFamily)
      if (!isFamily) { navigate('/familycode') }
      else if (!hasRole) { navigate('/role') }
      else { navigate('/') }
    } catch(err) {
      console.log('err>>', err.response)
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalStyle />
      <Navbar />
      <Router />
    </LocalizationProvider>
  );
};

export default App;
