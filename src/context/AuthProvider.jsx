import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthValueContext = createContext();
export const AuthActionsContext = createContext();

const AuthProvider = ({ children }) => {
  const hasToken = !!localStorage.getItem('TOKEN');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const actions = useMemo(
    () => ({
      onLoggedIn() {
        setisLoggedIn(true);
      },
      onLoggedOut() {
        setisLoggedIn(false);
      },
    }),
    [isLoggedIn],
  );

  return (
    <AuthActionsContext.Provider value={actions}>
      <AuthValueContext.Provider value={{hasToken, isLoggedIn}}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionsContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
