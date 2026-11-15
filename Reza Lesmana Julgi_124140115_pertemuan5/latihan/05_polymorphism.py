
class MetodePembayaran:

    def __init__(self, nama_metode):

        self.nama_metode = nama_metode


    def bayar(self, tagihan):

        raise NotImplementedError("Method bayar harus diimplementasikan!")



class TransferBank(MetodePembayaran):

    def __init__(self, nama_bank, nomor_rekening, saldo):

        super().__init__("Transfer Bank")

        self.nama_bank = nama_bank

        self.nomor_rekening = nomor_rekening

        self.saldo = saldo


    def bayar(self, tagihan):

        if self.saldo >= tagihan:

            self.saldo -= tagihan

            print(f"[{self.nama_metode}] Pembayaran Rp {tagihan:.2f} BERHASIL via {self.nama_bank}")

            print(f"Sisa saldo: Rp {self.saldo:.2f}")

            return True

        else:

            print(f"[{self.nama_metode}] Gagal: Saldo tidak cukup!")

            return False



class EWallet(MetodePembayaran):

    def __init__(self, nama_provider, nomor_hp, saldo_wallet):

        super().__init__("E-Wallet")

        self.nama_provider = nama_provider

        self.nomor_hp = nomor_hp

        self.saldo_wallet = saldo_wallet


    def bayar(self, tagihan):

        cashback = tagihan * 0.05

        if self.saldo_wallet >= tagihan:

            self.saldo_wallet -= tagihan

            print(f"[{self.nama_metode}] Pembayaran Rp {tagihan:.2f} BERHASIL")

            print(f"Selamat! Anda mendapatkan cashback Rp {cashback:.2f}")

            print(f"Sisa saldo: Rp {self.saldo_wallet:.2f}")

            return True

        else:

            print(f"[{self.nama_metode}] Gagal: Saldo e-wallet tidak cukup!")

            return False



class CryptoPayment:

    def __init__(self, wallet_address, crypto_symbol="USDT"):

        self.wallet_address = wallet_address

        self.crypto_symbol = crypto_symbol


    def bayar(self, tagihan):

        total_crypto = tagihan / 16000

        print(f"[Crypto Payment] Mengonversi Rp {tagihan:.2f} menjadi {total_crypto:.2f} {self.crypto_symbol}")

        print(f"Transaksi tercatat di blockchain untuk wallet {self.wallet_address[:10]}...")

        return True



def proses_checkout_pesanan(daftar_opsi_bayar, total_belanja):

    print(f"\n===== PROSES CHECKOUT TAGIHAN Rp {total_belanja:.2f} =====")

    for opsi in daftar_opsi_bayar:

        print(f"\nMemproses opsi: {getattr(opsi, 'nama_metode', type(opsi).__name__)}")

        opsi.bayar(total_belanja)



class Dompet:

    def __init__(self, pemilik, saldo):

        self.pemilik = pemilik

        self.saldo = saldo


    def __add__(self, other):

        if isinstance(other, Dompet):

            return Dompet(f"{self.pemilik} & {other.pemilik}", self.saldo + other.saldo)

        elif isinstance(other, (int, float)):

            return Dompet(self.pemilik, self.saldo + other)

        return NotImplemented


    def __eq__(self, other):

        if isinstance(other, Dompet):

            return self.saldo == other.saldo

        return False


    def __str__(self):

        return f"Dompet({self.pemilik}): Rp {self.saldo:.2f}"



if __name__ == "__main__":

    va_bca = TransferBank("BCA", "880121140001", 500000)

    gopay = EWallet("GoPay", "081234567890", 500000)

    crypto = CryptoPayment("0x7C1...89A", "USDT")


    channel_pembayaran = [va_bca, gopay, crypto]


    proses_checkout_pesanan(channel_pembayaran, 320000)


    print("\n--- Uji Operator Overloading Dompet ---")

    dompet1 = Dompet("Ahmad", 100000)

    dompet2 = Dompet("Budi", 150000)

    dompet3 = dompet1 + dompet2

    dompet4 = dompet1 + 50000


    print(dompet1)

    print(dompet2)

    print(dompet3)

    print(dompet4)

    print("Apakah saldo dompet1 dan dompet2 sama?", dompet1 == dompet2)
