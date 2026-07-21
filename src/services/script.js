const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let firstDayIndex;
let totalDays;

let wetonUser = {
    hari: null,    
    pasaran: null, 
    neptu: 0        
};

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

function getNamaBulan(index) {
    const namaBulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return namaBulanIndo[index];
}

function updateKalender() {
    const firstDayDate = new Date(currentYear, currentMonth, 1);
    firstDayIndex = firstDayDate.getDay();
    totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
}

function hitungNeptuUser(hari, pasaran) {
    // Pakai toLowerCase() biar aman dari huruf besar/kecil
    const nHari = NEPTU_HARI[hari.toLowerCase()];
    const nPasaran = NEPTU_PASARAN[pasaran.toLowerCase()];
    
    return nHari + nPasaran;
}

function hitungNeptuTarget(hariTarget, pasaranTarget) {
    const nHari = NEPTU_HARI[hariTarget.toLowerCase()];
    const nPasaran = NEPTU_PASARAN[pasaranTarget.toLowerCase()];
    
    return nHari + nPasaran;
}

function hitungSisaBagi(neptuUser, neptuTarget) {
    const totalKeseluruhan = neptuUser + neptuTarget;
    return totalKeseluruhan % 8;
}

function hitungPancasuda(hariUser, pasaranUser, hariTarget, pasaranTarget) {
    const nilaiNeptuUser = hitungNeptuUser(hariUser, pasaranUser);
    const nilaiNeptuTarget = hitungNeptuTarget(hariTarget, pasaranTarget);
    const sisaBagi = hitungSisaBagi(nilaiNeptuUser, nilaiNeptuTarget);
    const hasilAkhir = PANCA_SUDA[sisaBagi];
    return hasilAkhir;
}

function renderKalender(dataBulanIni) {
    const calendarGrid = document.getElementById("calendar-grid")
    
    let html = ""
    
    for (let i = 0; i < firstDayIndex; i++) {
        html += "<div></div>";
    }
    
    for (let day = 1; day <= totalDays; day++) {
        const dataHariIni = dataBulanIni.find(item => item.day === day);
        
    
        html += `<div class="border p-2">${day}  ${dataHariIni.pasaran}</div>`;
    }

    calendarGrid.innerHTML = html;
}

updateKalender();


document.getElementById("next-month").addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateKalender();
    ambilDataKalender();
    document.getElementById("bulan-tahun-label").textContent = `${getNamaBulan(currentMonth)} ${currentYear}`;
});

document.getElementById("prev-month").addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateKalender();
    ambilDataKalender();
    document.getElementById("bulan-tahun-label").textContent = `${getNamaBulan(currentMonth)} ${currentYear}`;
});