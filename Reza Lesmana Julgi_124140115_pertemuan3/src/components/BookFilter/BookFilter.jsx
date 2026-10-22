import PropTypes from 'prop-types';
import { BOOK_STATUSES } from '../../context/BookContext.jsx';
import './BookFilter.css';
export default function BookFilter({ search, onSearchChange, status, onStatusChange }) {
  return <div className="book-filter"><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Cari judul atau penulis" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Cari judul atau penulis..." /></label><label className="filter-select"><span>Filter status</span><select aria-label="Filter status" value={status} onChange={(event) => onStatusChange(event.target.value)}><option value="Semua">Semua buku</option>{BOOK_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></label></div>;
}
BookFilter.propTypes = { search: PropTypes.string.isRequired, onSearchChange: PropTypes.func.isRequired, status: PropTypes.string.isRequired, onStatusChange: PropTypes.func.isRequired };
