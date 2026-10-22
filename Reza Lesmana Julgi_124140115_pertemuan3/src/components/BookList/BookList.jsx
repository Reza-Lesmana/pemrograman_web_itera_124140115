import PropTypes from 'prop-types';
import './BookList.css';
const statusClass = { 'Milik': 'owned', 'Dibaca': 'reading', 'Ingin Dibeli': 'wanted' };
export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) return <div className="empty-state"><span className="empty-icon">▤</span><h3>Belum ada buku di sini</h3><p>Coba ubah pencarian atau tambahkan buku pertamamu.</p></div>;
  return <div className="book-grid">{books.map((book) => <article className="book-card" key={book.id}><div className="book-cover"><span className="cover-mark">R.</span><span className="cover-lines"/><span className="cover-bottom">CATATAN BACA</span></div><div className="book-info"><span className={`status-pill ${statusClass[book.status]}`}>{book.status}</span><h3>{book.title}</h3><p className="book-author">oleh {book.author}</p><div className="book-actions"><button type="button" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}>Edit</button><button type="button" className="delete-action" onClick={() => { if (window.confirm(`Hapus buku “${book.title}”?`)) onDelete(book.id); }} aria-label={`Hapus ${book.title}`}>Hapus</button></div></div></article>)}</div>;
}
BookList.propTypes = { books: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.string.isRequired })).isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired };
