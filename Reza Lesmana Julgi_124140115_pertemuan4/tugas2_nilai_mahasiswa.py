# Nama  : Reza Lesmana Julgi
# NIM   : 124140115
# Kelas : Praktikum PAW RA
# Tugas : 2 - Program Pengelolaan Data Nilai Mahasiswa

# Program Pengelolaan Data Nilai Mahasiswa

# Data mahasiswa dalam bentuk list of dictionary
data_mahasiswa = [
    {
        "nama": "Reza Lesmana Julgi",
        "nim": "124140115",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Dew Jirawat",
        "nim": "32140116",
        "nilai_uts": 75,
        "nilai_uas": 80,
        "nilai_tugas": 85
    },
    {
        "nama": "Tee Derach",
        "nim": "32140117",
        "nilai_uts": 60,
        "nilai_uas": 65,
        "nilai_tugas": 70
    },
    {
        "nama": "Yu Yaesol",
        "nim": "32140118",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 92
    },
    {
        "nama": "Na Jaemin",
        "nim": "32140119",
        "nilai_uts": 50,
        "nilai_uas": 55,
        "nilai_tugas": 45
    }
]


# Fungsi untuk menghitung nilai akhir
def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """
    Menghitung nilai akhir mahasiswa berdasarkan bobot UTS, UAS, dan Tugas.
    """
    nilai_akhir = (
        (30 / 100 * nilai_uts) +
        (40 / 100 * nilai_uas) +
        (30 / 100 * nilai_tugas)
    )
    return nilai_akhir


# Fungsi untuk menentukan grade
def tentukan_grade(nilai_akhir):
    """
    Menentukan grade mahasiswa berdasarkan nilai akhir.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


# Menghitung nilai akhir dan grade setiap mahasiswa
for mahasiswa in data_mahasiswa:
    mahasiswa["nilai_akhir"] = hitung_nilai_akhir(
        mahasiswa["nilai_uts"],
        mahasiswa["nilai_uas"],
        mahasiswa["nilai_tugas"]
    )

    mahasiswa["grade"] = tentukan_grade(
        mahasiswa["nilai_akhir"]
    )


# Menampilkan seluruh data mahasiswa
print("=" * 100)
print("                 PROGRAM PENGELOLAAN DATA NILAI MAHASISWA")
print("=" * 100)

print(
    f"{'No':<4}"
    f"{'Nama':<25}"
    f"{'NIM':<15}"
    f"{'UTS':>8}"
    f"{'UAS':>8}"
    f"{'Tugas':>8}"
    f"{'Nilai Akhir':>14}"
    f"{'Grade':>8}"
)

print("-" * 100)

for nomor, mahasiswa in enumerate(data_mahasiswa, start=1):
    print(
        f"{nomor:<4}"
        f"{mahasiswa['nama']:<25}"
        f"{mahasiswa['nim']:<15}"
        f"{mahasiswa['nilai_uts']:>8}"
        f"{mahasiswa['nilai_uas']:>8}"
        f"{mahasiswa['nilai_tugas']:>8}"
        f"{mahasiswa['nilai_akhir']:>14.2f}"
        f"{mahasiswa['grade']:>8}"
    )

print("=" * 100)


# Menentukan mahasiswa dengan nilai tertinggi dan terendah
mahasiswa_tertinggi = max(
    data_mahasiswa,
    key=lambda mahasiswa: mahasiswa["nilai_akhir"]
)

mahasiswa_terendah = min(
    data_mahasiswa,
    key=lambda mahasiswa: mahasiswa["nilai_akhir"]
)

# Menampilkan nilai tertinggi
print("\nMAHASISWA DENGAN NILAI AKHIR TERTINGGI")
print("-" * 45)
print(f"Nama        : {mahasiswa_tertinggi['nama']}")
print(f"NIM         : {mahasiswa_tertinggi['nim']}")
print(f"Nilai Akhir : {mahasiswa_tertinggi['nilai_akhir']:.2f}")
print(f"Grade       : {mahasiswa_tertinggi['grade']}")

# Menampilkan nilai terendah
print("\nMAHASISWA DENGAN NILAI AKHIR TERENDAH")
print("-" * 45)
print(f"Nama        : {mahasiswa_terendah['nama']}")
print(f"NIM         : {mahasiswa_terendah['nim']}")
print(f"Nilai Akhir : {mahasiswa_terendah['nilai_akhir']:.2f}")
print(f"Grade       : {mahasiswa_terendah['grade']}")

print("\nProgram selesai dijalankan.")
