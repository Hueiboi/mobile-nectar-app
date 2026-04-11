// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const login = async (userData) => {
    // Giả lập logic validation/login
    const token = 'mock-jwt-token'; 
    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.log(`Check login error: ${e}`);
    }
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