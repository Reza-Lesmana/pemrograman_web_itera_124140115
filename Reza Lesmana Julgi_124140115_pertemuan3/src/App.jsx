import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Stats from './pages/Stats/Stats.jsx';
import './styles.css';
export default function App() {
  return <div className="app-shell"><header className="topbar"><NavLink to="/" className="brand"><span className="brand-mark">r.</span><span><strong>rak buku</strong><small>PERSONAL READING SPACE</small></span></NavLink><nav aria-label="Navigasi utama"><NavLink to="/" end>Koleksi</NavLink><NavLink to="/stats">Statistik</NavLink></nav><span className="topbar-label">MY LITTLE LIBRARY <span>✳</span></span></header><main className="main-content"><Routes><Route path="/" element={<Home/>}/><Route path="/stats" element={<Stats/>}/><Route path="*" element={<div className="not-found"><h1>Halaman tidak ditemukan</h1><NavLink to="/">Kembali ke koleksi</NavLink></div>}/></Routes></main><footer className="footer"><span>rak buku <span className="footer-dot">●</span> ruang kecil untuk cerita besar</span><span>Dibuat dengan ☕ dan React</span></footer></div>;
}
