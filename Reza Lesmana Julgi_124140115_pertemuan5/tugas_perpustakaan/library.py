
from library_item import Book, Magazine


class Library:

    def __init__(self, name):
        self.name = name
        self.__items = []

    @property
    def items(self):
        return self.__items.copy()

    def add_item(self, item):

        for data in self.__items:
            if data.item_id == item.item_id:
                print("ID item sudah digunakan!")
                return

        self.__items.append(item)
        print("Item berhasil ditambahkan!")

    def show_items(self):

        print("\n===== KATALOG PERPUSTAKAAN =====")

        if not self.__items:
            print("Belum ada item di perpustakaan.")
            return

        for item in self.__items:
            print(item.get_detail())

    def search_item(self, keyword):

        hasil = []

        for item in self.__items:

            if keyword.lower() in item.title.lower() or keyword.lower() == item.item_id.lower():
                hasil.append(item)

        if hasil:
            print("\n===== HASIL PENCARIAN =====")

            for item in hasil:
                print(item.get_detail())

        else:
            print("Item tidak ditemukan.")

    def borrow_item(self, item_id):

        for item in self.__items:

            if item.item_id.lower() == item_id.lower():

                if item.available:
                    item.change_status(False)
                    print("Item berhasil dipinjam!")
                else:
                    print("Item sedang dipinjam.")

                return

        print("ID item tidak ditemukan.")

    def return_item(self, item_id):

        for item in self.__items:

            if item.item_id.lower() == item_id.lower():

                if not item.available:
                    item.change_status(True)
                    print("Item berhasil dikembalikan!")
                else:
                    print("Item belum dipinjam.")

                return

        print("ID item tidak ditemukan.")
