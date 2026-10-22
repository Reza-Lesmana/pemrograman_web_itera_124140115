import { useMemo, useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import BookForm from '../../components/BookForm/BookForm.jsx';
import BookFilter from '../../components/BookFilter/BookFilter.jsx';
import BookList from '../../components/BookList/BookList.jsx';
import './Home.css';
export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Semua');
  const [editingBook, setEditingBook] = useState(null);
  const visibleBooks = useMemo(() => books.filter((book) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);
    return matchesSearch && (status === 'Semua' || book.status === status);
  }), [books, search, status]);
  function handleSubmit(book) {
    if (editingBook) { updateBook(editingBook.id, book); setEditingBook(null); }
    else addBook(book);
  }
  return <div className="page-layout"><section className="collection-column"><div className="welcome-block"><p className="eyebrow">RUANG BACA KECILMU</p><h1>Semua cerita,<br/><em>tersimpan di sini.</em></h1><p className="welcome-copy">Catat buku yang kamu punya, sedang kamu baca, atau masuk daftar keinginanmu.</p><div className="welcome-decoration" aria-hidden="true">❧</div></div><div className="collection-heading"><div><p className="eyebrow">RAK BUKU</p><h2>Koleksiku <span>{books.length}</span></h2></div><p className="muted-note">Satu halaman untuk semua bacaanmu.</p></div><BookFilter search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus}/><BookList books={visibleBooks} onEdit={setEditingBook} onDelete={(id) => { deleteBook(id); if (editingBook?.id === id) setEditingBook(null); }}/></section><aside className="form-column"><BookForm onSubmit={handleSubmit} editingBook={editingBook} onCancel={() => setEditingBook(null)}/><div className="reading-note"><span>✳</span><div><strong>Catatan kecil</strong><p>Setiap buku menyimpan dunia. Jangan lupa kembali membaca halaman berikutnya.</p></div></div></aside></div>;
}
