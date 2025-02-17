// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  // Retrieve token and user from localStorage, if available
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  let parsedUser = null;
  try {
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
  }

  // Set the initial state for auth
  const [auth, setAuth] = useState({
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    user: parsedUser,
  });

  // Sync the auth state with localStorage whenever it changes
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('user', JSON.stringify(auth.user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    if (auth.user) {
      console.log('User name:', auth.user.name);
    }
  }, [auth]);

  // Provide the context to the app
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
