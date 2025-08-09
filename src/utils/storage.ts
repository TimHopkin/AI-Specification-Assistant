import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'spec-mentor-key-2025'; // In production, use environment variable

// Save data to localStorage with encryption for sensitive data
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    
    // Encrypt API keys and sensitive data
    if (key.includes('api') || key.includes('key')) {
      const encrypted = CryptoJS.AES.encrypt(serializedData, ENCRYPTION_KEY).toString();
      localStorage.setItem(`sm_${key}`, encrypted);
    } else {
      localStorage.setItem(`sm_${key}`, serializedData);
    }
  } catch (error) {
    console.error(`Error saving to storage:`, error);
  }
};

// Load data from localStorage with decryption for sensitive data
export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(`sm_${key}`);
    if (!item) return null;

    // Decrypt API keys and sensitive data
    if (key.includes('api') || key.includes('key')) {
      const decrypted = CryptoJS.AES.decrypt(item, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } else {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error(`Error loading from storage:`, error);
    return null;
  }
};

// Remove data from localStorage
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(`sm_${key}`);
  } catch (error) {
    console.error(`Error removing from storage:`, error);
  }
};

// Clear all app data from localStorage
export const clearAllStorage = (): void => {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('sm_'));
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error(`Error clearing storage:`, error);
  }
};

// Utility to check if localStorage is available
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = 'sm_test';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};