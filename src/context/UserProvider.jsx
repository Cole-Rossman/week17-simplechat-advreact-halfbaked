import { createContext, useContext, useMemo, useState } from 'react';
import {
  getUser,
  signInUser,
  signOutUser,
  signUpUser,
} from '../services/users';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState({
    id: currentUser?.id ?? null,
    email: currentUser?.email ?? null,
  });

  const register = async (email, password) => {
    const user = await signUpUser(email, password);
    setUser(user);
  };

  const login = async (email, password) => {
    const user = await signInUser(email, password);
    setUser(user);
  };

  const logout = () => {
    signOutUser();
    setUser({ id: null, email: null });
  };

  const value = useMemo(() => ({ user, register, login, logout }), [user.id]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context.user;
};

const useAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return {
    register: context.register,
    login: context.login,
    logout: context.logout,
  };
};
export { UserContext, UserProvider, useUser, useAuth };
