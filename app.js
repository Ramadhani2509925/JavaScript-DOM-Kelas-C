console.log("Praktikum Dimulai");

// Aktivitas 1: DOM Selection seleksi DOM
// DOM Selection kita harus "Menangkap Elemen" Sebelum kita memanipulasi HTML
// Ambil Elemen -> Simpan di dalam variabel JavaScript

// 1. Ambil elemen judul Berdasarkan ID
// document.getElementById("...") -> Ambil Elemen HTML Spesifik berdasarkan ID
const judulUtama = document.getElementById("judul-utama");

// 1.1 querySelector("#...") mengambil ID berdasarkan atribut ID
// Tanda (#) Artinya menargetkan ID (.) menargetkan class
// Ambil elemen sub judul berdasarkan ID
const subJudul = document.querySelector("#sub-judul");

//2. Mengambil Elemen pada kartu 1(Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil tombol" aksi pada kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. mengambil elemen pada kartu 2 (fitur catatan dinamis / todolist)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");


// Aktivitas 2: manipulasi teks & style (pada kartu 1)
// addEventListener("click", function() {...}) -> artinya tolong dengarkan dan tunggu
// setelah di "click" oleh user jalankan perintah di dalam function

// A. Mengubah teks dan warna teks preview
btnUbahTeks.addEventListener("click", function(){
    // .innerText = mengisi/ menimpa tulisan teks yang ada di hmtl
    teksPreview.innerText = "Hebat! Teks ini berhasil di ubah melalui DOM!";

    // .style.color = mengubah warna teks secara langsung melalui JavaScript (inline)
    teksPreview.style.color = "#76d6e7";

    // console.log = mencetak pesan di console
    console.log("DOM Teks Preview telah diperbaharui");
});


// B. mengubah warna background Box preview
btnToggleWarna.addEventListener("click", function(){
    //.classList.toggle("nama-class") -> menambhkan class jika belum ada, menghapus class jika sudah ada
    //jika class tersebut belum ada pada elemen, maka class tersebut akan di tambahkan.
    // jika class tersebut sudah ada pada elemen, maka class tersebut akan di hapus
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Box Preview telah diperbaharui");
});


// mengembalikan teks dan warna teks preview ke default 
btnReset.addEventListener("click", function(){
    // mengembalikan teks preview ke default
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh JavaScript";

    // kosongkan warna agar warna kembali ke default (inherit)
    teksPreview.style.color = "";

    //Hapus class khusus menggunakan .classList.remove("nama-class")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Box Preview telah dikembalikan ke default");
});

// Aktivitas 3 & 4: membuat catatan dinamis (todolist) & menghitung jumlah catatan (pada kartu 2)
// dibagian ini kita belajar membuat elemen HTML baru (<li>) secara dinamis menggunakan javascript
// lalu mengisi teksnya, memberi tombol hapus, lalu menempelkannya kedalem layar (<ul>)


// langkah 1: membuat variabel untuk menampung jumlah catatan
// 'let' digunakan karena nilainya akan berubah ubah (mutable)
let totalCatatan = 0;


// langkah 2: membuat fungsi untuk menambahkan catatan baru
// fungsi ini adalah kumpulan perintah yang diberi nama. kita bisa memanggilnya kapanpun kita mau.
function perbaruiJumlah(){
    //masukan angka totalCatatan ke dalam elemen HTML jumlah Catatan
    jumlahCatatan.innerText = totalCatatan;

    // percabangan kondisi: apakah catatannya 0?
    if (totalCatatan === 0) {
        // JIKA 0: hapus class "hidden" agar pesan "tidak ada catatan" muncul
        pesanKosong.classList.remove("hidden");
    } else {
        // jika > 0: tambahkan class "hidden" agar pesan "tidak ada catatan" hilang
        pesanKosong.classList.add("hidden");
    }
}


// langkah 3: membuat fungsi untuk menambahkan catatan baru
function tambahCatatan(){
    //3.1 inputCatatan.value -> mengambil teks yang diketik user di input
    // .trim() -> menghapus spasi kosong di awal dan akhir teks
    const isiTeks = inputCatatan.value.trim();

    // 3.2 validasi input: jika variabel isiTeks kosong (""), maka tampilkan alert
    if (isiTeks === ""){
        alert("Catatan tidak boleh kosong!");
        return; // hentikan fungsijika input kosong
    }

    // 3.3 createElement("li") -> membuat elemen HTML baru <li> hanya di memory javaScript
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // memberi class agar tampilannya sesuai style css

    //3.4 mengisi teks catatn baru dengan cara innerHTML mengisi <li> dengan teks dan tombol hapus
    // tanda Bcaktick (`) digunakan agar kita bisa menulis teks multi-baris dan menyisipkan variabel dengan $
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button`; 

    // 3.5 menambahkan Event Listenir pada tombol hapus pada item <li>
    //querySelector(".btn-hapus") -> mengambil tombol hapusyang baru dibuat di dalam <li>
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        // menghapus
        liBaru.remove(); //menghapus elemen <li> dari dom .remove()
        totalCatatan--; // mengurangi jumlah catatan
        perbaruiJumlah(); // 
        console.log(`DOM catatan "${isiTeks}" telah dihapus`);
    })
    // 3.6 .appendChild(liBaru) -> menempelkan <li> baru ke dalam <ul> datarCatatan
daftarCatatan.appendChild(liBaru);

//3.7 mengkosongkan input setelah catatan di tambahkan
inputCatatan.value = "";

//3.8 menambahkan jumlah catatan dan memperbarui tampilan jumlah catatan
totalCatatan++;
perbaruiJumlah();

console.log(`DOM Catatan baru di tambahkan : ${isiTeks}`);

}

// langkah 4: event listenir untuk tombol tambah catatan
// ketika tombol tambah dikit, jalankan fungsi tambahCatatan
btnTambah.addEventListener("click", function(){
    tambahCatatan();
})
    
// Langkah 5 : event listenir untuk menambhkan catatan ketika menekan tombol enter di
inputCatatan.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        tambahCatatan();
    }
})

    
     


