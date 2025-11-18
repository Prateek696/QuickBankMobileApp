/**
 * Storage Service
 * Wrapper around AsyncStorage to replace localStorage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@quickbank:auth_token',
  USER_DATA: '@quickbank:user_data',
  REMEMBER_ME: '@quickbank:remember_me',
};

export const storage = {
  // Auth
  setAuthToken: async (token: string): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  getAuthToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  removeAuthToken: async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  setUserData: async (user: any): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  getUserData: async (): Promise<any | null> => {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  removeUserData: async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  setRememberMe: async (value: boolean): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEYS.REMEMBER_ME, JSON.stringify(value));
  },

  getRememberMe: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    return value ? JSON.parse(value) : false;
  },

  // Clear all
  clearAll: async (): Promise<void> => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.REMEMBER_ME,
    ]);
  },
};

