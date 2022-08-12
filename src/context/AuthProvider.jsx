import React, { createContext, useMemo, useState } from 'react';

export const AuthValueContext = createContext();
export const AuthActionsContext = createContext();

const AuthProvider = ({ children }) => {
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
      <AuthValueContext.Provider value={isLoggedIn}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionsContext.Provider>
  );
};

export default AuthProvider;
