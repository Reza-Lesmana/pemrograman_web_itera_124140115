import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookList from '../components/BookList/BookList.jsx';
const books = [{ id: '1', title: 'Laut Bercerita', author: 'Leila S. Chudori', status: 'Dibaca' }];
describe('BookList', () => {
  it('menampilkan judul, penulis, dan status buku', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Laut Bercerita' })).toBeInTheDocument();
    expect(screen.getByText('oleh Leila S. Chudori')).toBeInTheDocument();
    expect(screen.getByText('Dibaca')).toBeInTheDocument();
  });
  it('memanggil fungsi edit ketika tombol edit diklik', async () => {
    const user = userEvent.setup(); const edit = vi.fn();
    render(<BookList books={books} onEdit={edit} onDelete={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Edit Laut Bercerita' }));
    expect(edit).toHaveBeenCalledWith(books[0]);
  });
  it('menampilkan pesan ketika daftar buku kosong', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Belum ada buku di sini')).toBeInTheDocument();
  });
});
