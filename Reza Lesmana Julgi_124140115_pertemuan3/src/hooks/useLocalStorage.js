import { useEffect, useState } from 'react';

// Membaca data awal dari localStorage dan menyimpan perubahan secara otomatis.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error('Gagal membaca localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.error('Gagal menyimpan localStorage:', error); }
  }, [key, value]);

  return [value, setValue];
}
