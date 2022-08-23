import { useContext } from 'react';
import { AuthValueContext, AuthActionsContext } from '../context/AuthProvider';

const useAuth = () => {
  const { hasToken, isLoggedIn } = useContext(AuthValueContext);
  const actions = useContext(AuthActionsContext);
  return { hasToken, isLoggedIn, actions };
};

export default useAuth;
