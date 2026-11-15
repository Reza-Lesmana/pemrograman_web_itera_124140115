
from abc import ABC, abstractmethod


class LibraryItem(ABC):

    def __init__(self, item_id, title, year):
        self.__item_id = item_id
        self.__title = title
        self.__year = year
        self.__available = True

    @property
    def item_id(self):
        return self.__item_id

    @property
    def title(self):
        return self.__title

    @title.setter
    def title(self, new_title):
        if new_title:
            self.__title = new_title

    @property
    def year(self):
        return self.__year

    @property
    def available(self):
        return self.__available

    def change_status(self, status):
        self.__available = status

    @abstractmethod
    def get_detail(self):
        pass

    def __str__(self):
        return self.get_detail()


class Book(LibraryItem):

    def __init__(self, item_id, title, year, author):
        super().__init__(item_id, title, year)

        self.author = author

    def get_detail(self):
        status = "Tersedia" if self.available else "Dipinjam"

        return f"Buku | ID: {self.item_id} | Judul: {self.title} | Penulis: {self.author} | Tahun: {self.year} | Status: {status}"


class Magazine(LibraryItem):

    def __init__(self, item_id, title, year, edition):
        super().__init__(item_id, title, year)

        self.edition = edition

    def get_detail(self):
        status = "Tersedia" if self.available else "Dipinjam"

        return f"Majalah | ID: {self.item_id} | Judul: {self.title} | Edisi: {self.edition} | Tahun: {self.year} | Status: {status}"
