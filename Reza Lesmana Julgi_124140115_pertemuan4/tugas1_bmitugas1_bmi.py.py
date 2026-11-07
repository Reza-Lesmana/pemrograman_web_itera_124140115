# Reza Lesmana Julgi
# 124140115
# Kelas Praktikum PAW RA
# Tugas 1 - Program Penghitung BMI (Body Mass Index)


# Program Penghitung BMI (Body Mass Index)

print("===================================")
print("     PROGRAM PENGHITUNG BMI")
print("===================================")

# Input data pengguna
berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (meter): "))

# Menghitung BMI
bmi = berat / (tinggi ** 2)

# Menentukan kategori BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Menampilkan hasil
print("\n===================================")
print("          HASIL PERHITUNGAN")
print("===================================")
print(f"Berat Badan : {berat} kg")
print(f"Tinggi Badan: {tinggi} meter")
print(f"Nilai BMI   : {bmi:.2f}")
print(f"Kategori    : {kategori}")
print("===================================")
