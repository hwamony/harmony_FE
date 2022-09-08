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
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (hasToken) actions.onLoggedIn();
  }, [hasToken]);

  useEffect(() => {
    isLoggedIn && getInfo();
  }, [isLoggedIn]);

  const getInfo = async () => {
    try {
      const response = await api.get('/user/info');
      const { hasRole, isFamily, hasAllInfo } = response.data.data;

      if (!hasAllInfo) {
        navigate('/signup/kakao');
      } else if (!isFamily) {
        navigate('/familycode');
      } else if (!hasRole) {
        navigate('/role');
      } else if (isFamily && hasRole) {
        const paths = ['/familycode', '/role', '/signup/kakao'];
        for (let path of paths) {
          if (_.includes(pathname, path)) {
            navigate('/');
          }
        }
      }
    } catch (err) {
      localStorage.removeItem('TOKEN');
      navigate('/');
    }
  };

  return null;
};

export default AuthControl;
