import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Navbar from './components/common/Navbar';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';

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

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Router />
    </>
  );
};

export default App;
