# Tugas Individu 3 — Pemrograman Web

Website sederhana dua halaman menggunakan HTML dan CSS.

## Isi folder
- `index.html` — halaman pendaftaran dengan form `method="GET"`.
- `detail.html` — halaman detail berupa tabel informasi dan contoh desain query string. Halaman ini tidak membaca/memproses query string.
- `style.css` — styling layout, form, tabel, dan tampilan responsif.

## Cara menjalankan
1. Buka folder `task_3` di VS Code.
2. Buka `index.html` di browser (atau klik kanan lalu pilih **Open with Live Server** jika ekstensi Live Server tersedia).
3. Isi formulir dan tekan **Kirim formulir**.
4. Periksa URL di browser. Karena menggunakan GET, nilai form muncul sebagai parameter URL.
5. Halaman `detail.html` sengaja tidak menangkap nilai parameter, sesuai instruksi tugas.

## Kriteria yang dipenuhi
- Dua halaman HTML.
- Form pendaftaran menggunakan `method="GET"`.
- Desain query string menuju `detail.html`.
- Tabel informasi pada halaman detail.
- CSS dengan selector elemen, class, dan media query (lebih dari tiga selector).
- Layout responsif untuk layar kecil.
