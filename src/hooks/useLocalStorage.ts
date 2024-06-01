import { useState, useEffect } from 'react';

function getLocalStorageItem(key: string, initialValue: any) {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  const storedValue = window.localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
}

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getLocalStorageItem(key, initialValue);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const setValue = (value: any) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
