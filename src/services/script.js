const NEPTU_HARI = {
    senin: 4,
    selasa: 3,
    rabu: 7,
    kamis: 8,
    jumat: 6,
    sabtu: 9,
    minggu: 5
};

const NEPTU_PASARAN = {
    legi: 5,
    pahing: 9,
    pon: 7,
    wage: 4,
    kliwon: 8
};

const PANCA_SUDA = {
    1: { 
        nama: 'SRI', 
        arti: 'Sangat Baik. Rezeki melimpah, harapan tercapai.', 
        kelas: 'hijau' 
    },
    2: { 
        nama: 'LUNGGU', 
        arti: 'Kurang Baik. Ada hambatan, kesialan kecil, human error.', 
        kelas: 'kuning' 
    },
    3: { 
        nama: 'DADI', 
        arti: 'Baik. Apa yang dimulai akan berhasil/jadi.', 
        kelas: 'hijau' 
    },
    4: { 
        nama: 'KALA', 
        arti: 'Buruk. Bahaya, masalah, rintangan berat.', 
        kelas: 'merah' 
    },
    5: { 
        nama: 'PATI', 
        arti: 'Sangat Buruk. Kerugian, kematian energi, gagal total.', 
        kelas: 'hitam' 
    },
    6: { 
        nama: 'SUJANAN', 
        arti: 'Buruk. Perpisahan, salah paham, konflik, ditinggal.', 
        kelas: 'merah' 
    },
    7: { 
        nama: 'WUGU', 
        arti: 'Netral. Biasa saja, stabil, tidak ada hal istimewa.', 
        kelas: 'putih' 
    },
    0: { 
        nama: 'GEDHONG', 
        arti: 'Baik. Harta, kemakmuran, rezeki yang nempel.', 
        kelas: 'hijau' 
    }
};

// Variable untuk nyimpan data weton user
let wetonUser = {
    hari: null,    
    pasaran: null, 
    neptu: 0        
};

// ===== Tambahin ini di sini =====
let currentMonth = new Date().getMonth() + 1; // Ambil bulan sekarang (1-12)
let currentYear = new Date().getFullYear();   // Ambil tahun sekarang

// ==========================================
// 1. FUNGSI KECIL: Hitung Neptu User
// ==========================================
function hitungNeptuUser(hari, pasaran) {
    // Pakai toLowerCase() biar aman dari huruf besar/kecil
    const nHari = NEPTU_HARI[hari.toLowerCase()];
    const nPasaran = NEPTU_PASARAN[pasaran.toLowerCase()];
    
    return nHari + nPasaran;
}

// ==========================================
// 2. FUNGSI KECIL: Hitung Neptu Target
// ==========================================
function hitungNeptuTarget(hariTarget, pasaranTarget) {
    const nHari = NEPTU_HARI[hariTarget.toLowerCase()];
    const nPasaran = NEPTU_PASARAN[pasaranTarget.toLowerCase()];
    
    return nHari + nPasaran;
}

// ==========================================
// 3. FUNGSI KECIL: Jumlahkan & Modulo 8
// ==========================================
function hitungSisaBagi(neptuUser, neptuTarget) {
    const totalKeseluruhan = neptuUser + neptuTarget;
    return totalKeseluruhan % 8;
}

// ==========================================
// 4. FUNGSI UTAMA: Menggabungkan Semuanya
// ==========================================
function hitungPancasuda(hariUser, pasaranUser, hariTarget, pasaranTarget) {
    const nilaiNeptuUser = hitungNeptuUser(hariUser, pasaranUser);
    const nilaiNeptuTarget = hitungNeptuTarget(hariTarget, pasaranTarget);
    const sisaBagi = hitungSisaBagi(nilaiNeptuUser, nilaiNeptuTarget);
    const hasilAkhir = PANCA_SUDA[sisaBagi];
    return hasilAkhir;
}

// Test Function 1
console.log("Neptu User:", hitungNeptuUser('Selasa', 'Legi')); 
// Harusnya: 8

// Test Function 2
console.log("Neptu Target:", hitungNeptuTarget('senin', 'Pon')); 
// Harusnya: 11

// Test Function 3
console.log("Sisa Bagi:", hitungSisaBagi(8, 11)); 
// Harusnya: 19 % 8 = 3

// Test Function Utama
console.log("Hasil Akhir:", hitungPancasuda('Selasa', 'Legi', 'senin', 'Pon')); 
// Harusnya: Object DADI (karena sisa bagi 3)
