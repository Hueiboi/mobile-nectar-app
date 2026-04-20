import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  USER: '@user_session',
  CART: '@shopping_cart',
  ORDERS: '@order_history'
};

export const storageService = {
  save: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) { console.error("Error saving data", e); }
  },
  get: async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
  },
  remove: async (key) => {
    try { await AsyncStorage.removeItem(key); } catch (e) { console.error(e); }
  }
};