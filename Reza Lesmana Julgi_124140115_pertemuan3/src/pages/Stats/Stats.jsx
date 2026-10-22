import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext.jsx';
import useBookStats from '../../hooks/useBookStats.js';
import './Stats.css';
export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  const cards = [{ label: 'Total koleksi', value: stats.total, icon: '▤', note: 'Semua buku yang tercatat' }, { label: 'Buku dimiliki', value: stats.owned, icon: '⌂', note: 'Buku di rak pribadimu' }, { label: 'Sedang dibaca', value: stats.reading, icon: '◉', note: 'Cerita yang sedang berjalan' }, { label: 'Ingin dibeli', value: stats.wanted, icon: '♡', note: 'Buku dalam daftar keinginan' }];
  return <section className="stats-page"><p className="eyebrow">RINGKASAN KOLEKSI</p><h1>Jejak bacaanmu.</h1><p className="stats-intro">Lihat sekilas perjalanan koleksi buku pribadimu.</p><div className="stats-grid">{cards.map((card) => <article className="stat-card" key={card.label}><span className="stat-icon">{card.icon}</span><p>{card.label}</p><strong>{card.value}</strong><small>{card.note}</small></article>)}</div><div className="stats-bottom"><span>“Buku adalah cara paling tenang untuk pergi jauh.”</span><Link className="button button-primary" to="/">Kembali ke koleksi →</Link></div></section>;
}
