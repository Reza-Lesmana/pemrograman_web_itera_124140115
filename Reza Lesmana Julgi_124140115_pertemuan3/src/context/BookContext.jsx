import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage.js';

const BookContext = createContext(null);
export const BOOK_STATUSES = ['Milik', 'Dibaca', 'Ingin Dibeli'];

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('rak-buku-data', []);
  const addBook = (book) => setBooks((current) => [{ ...book, id: crypto.randomUUID() }, ...current]);
  const updateBook = (id, changes) => setBooks((current) => current.map((book) => book.id === id ? { ...book, ...changes } : book));
  const deleteBook = (id) => setBooks((current) => current.filter((book) => book.id !== id));
  const value = useMemo(() => ({ books, addBook, updateBook, deleteBook }), [books]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
BookProvider.propTypes = { children: PropTypes.node.isRequired };

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks harus digunakan di dalam BookProvider');
  return context;
}
