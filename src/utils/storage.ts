/**
 * Safe localStorage utilities
 * Handles cases where localStorage is not available (SSR, private browsing, etc.)
 */

const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const memoryStorage: Map<string, string> = new Map();

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isLocalStorageAvailable()) {
      try {
        return localStorage.getItem(key);
      } catch {
        return memoryStorage.get(key) ?? null;
      }
    }
    return memoryStorage.get(key) ?? null;
  },

  setItem: (key: string, value: string): void => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem(key, value);
        return;
      } catch {
        memoryStorage.set(key, value);
        return;
      }
    }
    memoryStorage.set(key, value);
  },

  removeItem: (key: string): void => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(key);
        memoryStorage.delete(key);
        return;
      } catch {
        memoryStorage.delete(key);
        return;
      }
    }
    memoryStorage.delete(key);
  },

  clear: (): void => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.clear();
      } catch {
        // Silently fail
      }
    }
    memoryStorage.clear();
  },
};

/**
 * Safe JSON parsing for localStorage values
 */
export const safeJSONParse = <T>(value: string | null, fallback: T): T => {
  if (value === null) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

/**
 * Get item from storage with JSON parsing
 */
export const getStorageItem = <T>(key: string, fallback: T): T => {
  const value = safeLocalStorage.getItem(key);
  return safeJSONParse(value, fallback);
};

/**
 * Set item in storage with JSON stringification
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    safeLocalStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail if JSON.stringify fails
  }
};
