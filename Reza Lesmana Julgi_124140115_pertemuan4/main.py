# Nama  : Reza Lesmana Julgi
# NIM   : 124140115
# Kelas : Praktikum PAW RA
# Tugas : 3 - Program Modul Matematika Python

import math_operations


from math_operations import (
    luas_persegi,
    keliling_persegi,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin
)


print("~" *   55)
print("       PROGRAM MODUL MATEMATIKA PYTHON~~")
print("~" * 55)



print("\n1. Hitung persegi")

sisi = 5

print(f"panjang sisi       : {sisi}")
print(f"luas persegi       : {luas_persegi(sisi)}")
print(f"keliling persegi   : {keliling_persegi(sisi)}")



print("\n2. Perhitungan persegi panjang")

panjang = 10

lebar = 5

print(f"panjang            : {panjang}")
print(f"lebar              : {lebar}")

print(f"luas               : {math_operations.luas_persegi_panjang(panjang, lebar)}")
print(f"keliling           : {math_operations.keliling_persegi_panjang(panjang, lebar)}")


print("\n3. Perhitungan lingkaran")
jari_jari =7
print(f"jari-jari          : {jari_jari}")
print(f"konstanta PI       : {math_operations.PI}")


print(f"luas lingkaran     : {math_operations.luas_lingkaran(jari_jari):.2f}")
print(f"keliling lingkaran : {math_operations.keliling_lingkaran(jari_jari):.2f}")


print("\n4. konversi celsius ke fahrenheit")
suhu_celsius = 30

print(f"Suhu Celsius       : {suhu_celsius} °C")

print(f"Suhu Fahrenheit    : {celsius_ke_fahrenheit(suhu_celsius):.2f} °F")


print("\n5. konversi celsius ke kelvin")

print(f"Suhu Celsius       : {suhu_celsius} °C")
print(f"Suhu Kelvin        : {celsius_ke_kelvin(suhu_celsius):.2f} K")



print("\n" + "~" * 55)
print("       program selesai dijalanin")
print("~" * 55)
