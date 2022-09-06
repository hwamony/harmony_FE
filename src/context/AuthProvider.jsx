import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthValueContext = createContext();
export const AuthActionsContext = createContext();

const AuthProvider = ({ children }) => {
  const hasToken = !!localStorage.getItem('TOKEN');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [scoreUp, setScoreUp] = useState(null);
  const actions = useMemo(
    () => ({
      onLoggedIn() {
        setisLoggedIn(true);
      },
      onLoggedOut() {
        setisLoggedIn(false);
      },
      onScoreChanged(score) {
        setScoreUp(score);
      },
    }),
    [],
  );

  return (
    <AuthActionsContext.Provider value={actions}>
      <AuthValueContext.Provider value={{ hasToken, isLoggedIn, scoreUp }}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionsContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
