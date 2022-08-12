import { useContext } from 'react';
import { AuthValueContext, AuthActionsContext } from '../context/AuthProvider';

const useAuth = () => {
  const isLoggedIn = useContext(AuthValueContext);
  const actions = useContext(AuthActionsContext);
  return { isLoggedIn, actions };
};

export default useAuth;
