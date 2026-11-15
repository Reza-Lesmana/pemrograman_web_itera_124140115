
from library_item import Book, Magazine
from library import Library
from member import Member


perpustakaan = Library("Perpustakaan Kampus")

anggota = Member("A001", "Mahasiswa")


perpustakaan.add_item(Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata"))

perpustakaan.add_item(Book("B002", "Bumi Manusia", 1980, "Pramoedya Ananta Toer"))

perpustakaan.add_item(Book("B003", "Laut Bercerita", 2017, "Leila S. Chudori"))

perpustakaan.add_item(Magazine("M001", "National Geographic", 2024, "Edisi 10"))

perpustakaan.add_item(Magazine("M002", "Bobo", 2023, "Edisi 25"))


while True:

    print("\n================================")
    print("   SISTEM MANAJEMEN PERPUSTAKAAN")
    print("================================")
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Tampilkan Katalog")
    print("4. Cari Item")
    print("5. Pinjam Item")
    print("6. Kembalikan Item")
    print("7. Informasi Anggota")
    print("8. Keluar")

    pilihan = input("\nPilih menu: ")


    if pilihan == "1":

        print("\n===== TAMBAH BUKU =====")

        item_id = input("Masukkan ID buku: ")
        title = input("Masukkan judul buku: ")
        author = input("Masukkan nama penulis: ")

        try:
            year = int(input("Masukkan tahun terbit: "))

            buku = Book(item_id, title, year, author)

            perpustakaan.add_item(buku)

        except ValueError:
            print("Tahun harus berupa angka!")


    elif pilihan == "2":

        print("\n===== TAMBAH MAJALAH =====")

        item_id = input("Masukkan ID majalah: ")
        title = input("Masukkan judul majalah: ")
        edition = input("Masukkan edisi majalah: ")

        try:
            year = int(input("Masukkan tahun terbit: "))

            majalah = Magazine(item_id, title, year, edition)

            perpustakaan.add_item(majalah)

        except ValueError:
            print("Tahun harus berupa angka!")


    elif pilihan == "3":

        perpustakaan.show_items()


    elif pilihan == "4":

        keyword = input("\nMasukkan judul atau ID item: ")

        perpustakaan.search_item(keyword)


    elif pilihan == "5":

        item_id = input("\nMasukkan ID item yang ingin dipinjam: ")

        perpustakaan.borrow_item(item_id)


    elif pilihan == "6":

        item_id = input("\nMasukkan ID item yang ingin dikembalikan: ")

        perpustakaan.return_item(item_id)


    elif pilihan == "7":

        anggota.show_member()


    elif pilihan == "8":

        print("\nTerima kasih telah menggunakan sistem perpustakaan.")

        break


    else:

        print("Pilihan tidak valid, silakan coba lagi.")
