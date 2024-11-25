import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  followers: any[];
  following: any[];
  recipesCreated: any[];
  recipesLiked: any[];
  _id: string;
  createdAt: string;
  __v: number;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('jwtToken');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch (error) {
      console.error('Failed to load user or token from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Failed to store user in localStorage', error);
    }
  }, [user]);

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('jwtToken', token);
      } else {
        localStorage.removeItem('jwtToken');
      }
    } catch (error) {
      console.error('Failed to store token in localStorage', error);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
