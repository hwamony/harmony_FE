import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import api from '../../api/AxiosManager';
import _ from 'lodash';

const AuthControl = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { hasToken, isLoggedIn, actions } = useAuth();

  useEffect(() => {
    console.log('hasToken:', hasToken);
    if (hasToken) {
      actions.onLoggedIn();
    } else if(pathname === '/login/oauth2/kakao') {
      actions.onLoggedOut();
    } else {
      actions.onLoggedOut();
      navigate('/login');
    }
  }, [hasToken]);

  useEffect(() => {
    if (hasToken) {
      const paths = ['/login', '/signup', '/signupcomplete'];
      for (let path of paths) {
        if (_.includes(pathname, path)) {
          navigate('/');
        }
      }
    }
    window.scrollTo(0, 0);
  }, [hasToken, pathname]);

  useEffect(() => {
    isLoggedIn && getInfo();
  }, [isLoggedIn]);

  const getInfo = async () => {
    try {
      const response = await api.get('/user/info');
      const { hasRole, isFamily } = response.data.data;

      if (!isFamily) {
        navigate('/familycode');
      } else if (!hasRole) {
        navigate('/role');
      } else if (isFamily && hasRole) {
        const paths = ['/familycode', '/role'];
        for (let path of paths) {
          if (_.includes(pathname, path)) {
            navigate('/');
          }
        }
      }
    } catch (err) {
      localStorage.removeItem('TOKEN');
      window.location.href('/');
    }
  };

  return null;
};

export default AuthControl;
