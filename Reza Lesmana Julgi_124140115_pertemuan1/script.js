// mengambil data lama dari localStorage

let keranjang = 
JSON.parse(localStorage.getItem("keranjang")) || [];




// saat halaman dibuka tampilkan data

tampilkanBarang();




// fungsi tambah barang

function tambahBarang(){



let nama =
document.getElementById("namaBarang").value;



let harga =
Number(document.getElementById("harga").value);



let qty =
Number(document.getElementById("qty").value);





// VALIDASI


if(nama.length < 3){

alert("Nama barang minimal 3 karakter");

return;

}



if(harga <= 500){

alert("Harga harus lebih dari 500");

return;

}



if(qty < 1){

alert("Jumlah minimal 1");

return;

}




// membuat objek barang


let barang = {


nama:nama,

harga:harga,

qty:qty,

subtotal:harga*qty


};





// masuk array

keranjang.push(barang);



// simpan

simpanData();



// tampilkan

tampilkanBarang();




// kosongkan input


document.getElementById("namaBarang").value="";

document.getElementById("harga").value="";

document.getElementById("qty").value="";


}









// menampilkan tabel


function tampilkanBarang(){


let tabel =
document.getElementById("tabelBarang");


tabel.innerHTML="";



let total=0;



keranjang.forEach(function(item,index){



total += item.subtotal;




tabel.innerHTML += `


<tr>


<td>${index+1}</td>


<td>${item.nama}</td>


<td>Rp ${item.harga}</td>


<td>${item.qty}</td>


<td>Rp ${item.subtotal}</td>



<td>


<button onclick="hapusBarang(${index})">

Hapus

</button>


</td>



</tr>



`;




});





document.getElementById("total")
.innerHTML = total;



}









// hapus barang


function hapusBarang(index){


keranjang.splice(index,1);


simpanData();


tampilkanBarang();


}









// simpan localStorage


function simpanData(){



localStorage.setItem(

"keranjang",

JSON.stringify(keranjang)

);


}









// hitung kembalian


function hitungKembalian(){



let total =
Number(document.getElementById("total").innerHTML);



let diskon =
Number(document.getElementById("diskon").value);



let bayar =
Number(document.getElementById("bayar").value);




let hargaAkhir =

total - (total * diskon /100);





if(bayar < hargaAkhir){


alert("Uang tidak cukup");


return;


}




let kembali =

bayar - hargaAkhir;



document.getElementById("kembali")
.innerHTML=kembali;



}









// reset transaksi


function resetTransaksi(){



keranjang=[];



localStorage.removeItem("keranjang");



tampilkanBarang();



document.getElementById("kembali")
.innerHTML=0;



}