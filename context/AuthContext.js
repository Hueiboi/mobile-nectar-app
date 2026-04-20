import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const login = async () => {
    const loginData = {
      token: 'mock-token',
      expiry: Date.now() + 2 * 60 * 60 * 1000 // 2 giờ
    };
    setUserToken(loginData.token);
    await AsyncStorage.setItem('auth_data', JSON.stringify(loginData));
  };

  const isLoggedIn = async () => {
    const res = await AsyncStorage.getItem('auth_data');
    if (res) {
      const { token, expiry } = JSON.parse(res);
      if (Date.now() > expiry) {
        await logout(); // Hết hạn -> văng ra ngoài
      } else {
        setUserToken(token);
      }
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};