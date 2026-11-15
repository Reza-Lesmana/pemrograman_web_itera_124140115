
class RekeningBank:

    def __init__(self, nomor_rekening, pemilik, saldo_awal, pin):

        self.nomor_rekening = nomor_rekening

        self.pemilik = pemilik

        self.__saldo = saldo_awal

        self.__pin = pin

        self.riwayat_transaksi = []


    @property
    def saldo(self):

        return self.__saldo


    @saldo.setter
    def saldo(self, nilai):

        if nilai >= 0:

            self.__saldo = nilai

        else:

            raise ValueError("Saldo tidak boleh negatif!")


    def setor(self, nominal):

        if nominal > 0:

            self.__saldo += nominal

            self.riwayat_transaksi.append(f"Setor Tunai: Rp {nominal:.2f}")

            print(f"Setor tunai Rp {nominal:.2f} berhasil. Saldo saat ini: Rp {self.__saldo:.2f}")

        else:

            print("Nominal setor harus lebih dari Rp 0!")


    def tarik(self, nominal, pin_input):

        if pin_input != self.__pin:

            print("Gagal: PIN Transaksi yang Anda masukkan salah!")

            return False


        if nominal <= 0:

            print("Gagal: Nominal penarikan harus lebih dari Rp 0!")

            return False


        if nominal > self.__saldo:

            print("Gagal: Saldo tidak mencukupi!")

            return False


        self.__saldo -= nominal

        self.riwayat_transaksi.append(f"Tarik Tunai: Rp {nominal:.2f}")

        print(f"Tarik tunai Rp {nominal:.2f} berhasil. Sisa saldo: Rp {self.__saldo:.2f}")

        return True


    def cetak_mutasi(self):

        print(f"\n=== MUTASI REKENING {self.nomor_rekening} ({self.pemilik}) ===")

        for log in self.riwayat_transaksi:

            print("-", log)

        print(f"Saldo Akhir Terverifikasi: Rp {self.__saldo:.2f}")



if __name__ == "__main__":

    rek = RekeningBank("121-009-8871", "Ahmad Fadhilah", 500000, "123456")


    print("Nomor Rekening:", rek.nomor_rekening)

    print("Pemilik Rekening:", rek.pemilik)

    print("Saldo Rekening:", rek.saldo)


    rek.setor(250000)

    rek.tarik(100000, "999999")

    rek.tarik(100000, "123456")

    rek.tarik(1000000, "123456")


    try:

        rek.saldo = -50000

    except ValueError as err:

        print("Validasi Tertangkap:", err)


    try:

        print(rek.__saldo)

    except AttributeError:

        print("Akses langsung rek.__saldo GAGAL karena terlindungi")


    print("\nNilai Name Mangling:", rek._RekeningBank__saldo)


    rek.cetak_mutasi()
