import { useContext } from 'react';
import { AuthValueContext, AuthActionsContext } from '../context/AuthProvider';

const useAuth = () => {
  const { hasToken, isLoggedIn, scoreUp } = useContext(AuthValueContext);
  const actions = useContext(AuthActionsContext);
  return { hasToken, isLoggedIn, scoreUp, actions };
};

export default useAuth;
