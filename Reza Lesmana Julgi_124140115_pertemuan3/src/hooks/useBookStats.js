import { useMemo } from 'react';

// Menghitung ringkasan koleksi buku berdasarkan statusnya.
export default function useBookStats(books) {
  return useMemo(() => ({
    total: books.length,
    owned: books.filter((book) => book.status === 'Milik').length,
    reading: books.filter((book) => book.status === 'Dibaca').length,
    wanted: books.filter((book) => book.status === 'Ingin Dibeli').length,
  }), [books]);
}
