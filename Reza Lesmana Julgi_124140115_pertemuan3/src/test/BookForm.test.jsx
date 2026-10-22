import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookForm from '../components/BookForm/BookForm.jsx';

describe('BookForm', () => {
  it('menampilkan form tambah buku', () => {
    render(<BookForm onSubmit={vi.fn()} editingBook={null} onCancel={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Tambah buku baru' })).toBeInTheDocument();
  });
  it('menampilkan validasi ketika judul dan penulis kosong', async () => {
    const user = userEvent.setup(); const submit = vi.fn();
    render(<BookForm onSubmit={submit} editingBook={null} onCancel={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Tambahkan buku' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Judul dan nama penulis wajib diisi.');
    expect(submit).not.toHaveBeenCalled();
  });
  it('mengirim data buku yang valid', async () => {
    const user = userEvent.setup(); const submit = vi.fn();
    render(<BookForm onSubmit={submit} editingBook={null} onCancel={vi.fn()} />);
    await user.type(screen.getByLabelText('Judul buku'), 'Bumi Manusia');
    await user.type(screen.getByLabelText('Nama penulis'), 'Pramoedya');
    await user.click(screen.getByRole('button', { name: 'Tambahkan buku' }));
    expect(submit).toHaveBeenCalledWith({ title: 'Bumi Manusia', author: 'Pramoedya', status: 'Milik' });
  });
});
