import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BOOK_STATUSES } from '../../context/BookContext.jsx';
import './BookForm.css';

const emptyForm = { title: '', author: '', status: 'Milik' };
export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(editingBook ? { title: editingBook.title, author: editingBook.author, status: editingBook.status } : emptyForm);
    setError('');
  }, [editingBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError('Judul dan nama penulis wajib diisi.');
      return;
    }
    onSubmit({ title: form.title.trim(), author: form.author.trim(), status: form.status });
    setForm(emptyForm);
    setError('');
  }

  return <form className="book-form" onSubmit={handleSubmit} noValidate>
    <div className="form-heading"><div><p className="eyebrow">KOLEKSI PRIBADI</p><h2>{editingBook ? 'Edit detail buku' : 'Tambah buku baru'}</h2></div><span className="form-icon">＋</span></div>
    <label>Judul buku<input name="title" value={form.title} onChange={handleChange} placeholder="Contoh: Laut Bercerita" aria-label="Judul buku" /></label>
    <label>Nama penulis<input name="author" value={form.author} onChange={handleChange} placeholder="Contoh: Leila S. Chudori" aria-label="Nama penulis" /></label>
    <label>Status buku<select name="status" value={form.status} onChange={handleChange} aria-label="Status buku">{BOOK_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions"><button className="button button-primary" type="submit">{editingBook ? 'Simpan perubahan' : 'Tambahkan buku'}</button>{editingBook && <button className="button button-quiet" type="button" onClick={onCancel}>Batal</button>}</div>
  </form>;
}
BookForm.propTypes = { onSubmit: PropTypes.func.isRequired, editingBook: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.string.isRequired }), onCancel: PropTypes.func.isRequired };
