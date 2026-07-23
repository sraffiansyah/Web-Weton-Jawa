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
        arti: 'Baik. Rejeki, kemakmuran.', 
        kelas: 'hijau' 
    },
    2: { 
        nama: 'LUNGGUH', 
        arti: 'Baik. Kedudukan, dihormati.', 
        kelas: 'hijau' 
    },
    3: { 
        nama: 'GEDHONG', 
        arti: 'Baik. Harta, simpanan aman.', 
        kelas: 'hijau' 
    },
    4: { 
        nama: 'LORO', 
        arti: 'Buruk. Sakit, halangan.', 
        kelas: 'merah' 
    },
    0: { 
        nama: 'PATI', 
        arti: 'Buruk. Sial, mendekati bahaya.', 
        kelas: 'hitam' 
    }
};

const WARNA_KELAS = {
    hijau: { dot: "bg-emerald-500", hover: "hover:bg-emerald-50 hover:shadow-[0_0_15px_2px_rgba(16,185,129,0.5)]" },
    merah: { dot: "bg-red-500", hover: "hover:bg-red-50 hover:shadow-[0_0_15px_2px_rgba(239,68,68,0.5)]" },
    hitam: { dot: "bg-gray-800", hover: "hover:bg-gray-100 hover:shadow-[0_0_15px_2px_rgba(31,41,55,0.5)]" }
};

// Fungsi untuk mendapatkan nama bulan berdasarkan indeks
function getNamaBulan(index) {
    const namaBulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return namaBulanIndo[index];
}

// Fungsi untuk mengambil data kalender dari file JSON
function updateKalender() {
    const firstDayDate = new Date(currentYear, currentMonth, 1);
    firstDayIndex = firstDayDate.getDay();
    totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
}

// Fungsi untuk menghitung nilai Neptu berdasarkan hari dan pasaran
function hitungNeptuUser(hari, pasaran) {
    // Pakai toLowerCase() biar aman dari huruf besar/kecil
    const nHari = NEPTU_HARI[hari.toLowerCase()];
    const nPasaran = NEPTU_PASARAN[pasaran.toLowerCase()];
    
    return nHari + nPasaran;
}

// Fungsi untuk menghitung nilai Neptu target berdasarkan hari dan pasaran
function hitungNeptuTarget(hariTarget, pasaranTarget) {
    const nHari = NEPTU_HARI[hariTarget.toLowerCase()];
    const nPasaran = NEPTU_PASARAN[pasaranTarget.toLowerCase()];
    
    return nHari + nPasaran;
}

// Fungsi untuk menghitung sisa bagi dari total neptu user dan target
function hitungSisaBagi(neptuUser, neptuTarget) {
    const totalKeseluruhan = neptuUser + neptuTarget;
    return totalKeseluruhan % 5;  
}

// Fungsi utama untuk menghitung Pancasuda berdasarkan input user dan target
function hitungPancasuda(neptuUser, hariTarget, pasaranTarget) {
    const nilaiNeptuTarget = hitungNeptuTarget(hariTarget, pasaranTarget);
    const sisaBagi = hitungSisaBagi(neptuUser, nilaiNeptuTarget);
    const hasilAkhir = PANCA_SUDA[sisaBagi];
    return hasilAkhir;
}

// Fungsi untuk mengambil data kalender dari file JSON
function renderKalender(dataBulanIni, neptuUser = null) {
    const calendarGrid = document.getElementById("calendar-grid");
    
    let html = "";
    
    for (let i = 0; i < firstDayIndex; i++) {
        html += "<div></div>";
    }
    
    for (let day = 1; day <= totalDays; day++) {
        const dataHariIni = dataBulanIni.find(item => item.day === day);
        
        let dotHtml = "";
        let hoverClass = "";
        let namaKategoriHtml = "";
        
        if (neptuUser !== null) {
            const hasilPancasuda = hitungPancasuda(neptuUser, dataHariIni.weekday, dataHariIni.pasaran);
            const warna = WARNA_KELAS[hasilPancasuda.kelas];
            
            dotHtml = `<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full ${warna.dot} group-hover:opacity-0 transition-opacity duration-300"></span>`;
            hoverClass = `${warna.hover} group`;
            namaKategoriHtml = `<span class="hidden group-hover:block text-[10px] font-bold mt-1 uppercase">${hasilPancasuda.nama}</span>`;
        }
        
        html += `
            <div class="relative border rounded-lg p-2 h-16 text-xs sm:text-sm md:text-base transition-all duration-300 ${hoverClass}">
                <div class="font-semibold">${day}</div>
                <div class="text-gray-500 text-[10px] sm:text-xs">${dataHariIni.pasaran}</div>
                ${dotHtml}
                ${namaKategoriHtml}
            </div>
        `;
    }

    const totalKotakTerisi = firstDayIndex + totalDays;
    const sisaKotakKosong = 42 - totalKotakTerisi;

    for (let i = 0; i < sisaKotakKosong; i++) {
        html += `<div class="h-16"></div>`;    
    }

    calendarGrid.innerHTML = html;
}

function renderLegend() {
    const legendContainer = document.getElementById("legend-container");
    let html = "";
    
    for (const key in PANCA_SUDA) {
        const item = PANCA_SUDA[key];
        const warna = WARNA_KELAS[item.kelas];
        
        html += `
            <div class="border rounded-lg p-3 flex items-start gap-2">
                <span class="w-3 h-3 rounded-full ${warna.dot} mt-1 flex-shrink-0"></span>
                <div>
                    <div class="font-bold text-sm">${item.nama}</div>
                    <div class="text-xs text-gray-500">${item.arti}</div>
                </div>
            </div>
        `;
    }
    
    legendContainer.innerHTML = html;
}

updateKalender();

// Event listener for the next month button
document.getElementById("next-month").addEventListener("click", function() {
    if (currentYear === 2030 && currentMonth === 11) {
        document.getElementById("next-month").disabled = true;
        // alert("Kalender hanya tersedia hingga Desember 2030.");
        return;
    }
    
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateKalender();
    ambilDataKalender();
    document.getElementById("bulan-tahun-label").textContent = `${getNamaBulan(currentMonth)} ${currentYear}`;
});

// Event listener for the prev month button
document.getElementById("prev-month").addEventListener("click", function() {
    if (currentYear === 2000 && currentMonth === 0) {
        document.getElementById("prev-month").disabled = true;
        // alert("Kalender hanya tersedia mulai Januari 2000.");
        return;
    }

    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateKalender();
    ambilDataKalender();
    document.getElementById("bulan-tahun-label").textContent = `${getNamaBulan(currentMonth)} ${currentYear}`;
});

// Untuk menampilkan bulan dan tahun saat ini di label
document.getElementById("mode-input").addEventListener("change", function() {
    const modeTerpilih = this.value; 
    
    const sectionHariPasaran = document.getElementById("section-hari-pasaran");
    const sectionTanggalLahir = document.getElementById("section-tanggal-lahir");

    
    if (modeTerpilih === "hari-pasaran") {
        sectionHariPasaran.classList.remove("hidden");
        sectionTanggalLahir.classList.add("hidden");
    } else if (modeTerpilih === "tanggal-lahir") {
        sectionHariPasaran.classList.add("hidden");
        sectionTanggalLahir.classList.remove("hidden");
    }
});

// Event listener for the "Hitung" button
document.getElementById("btn-hitung").addEventListener("click", async function() {
    const mode = document.getElementById("mode-input").value;
    let neptuUser = null;
    
    if (mode === "hari-pasaran") {
        const hariUser =document.getElementById("input-hari").value;
        const pasaranUser = document.getElementById("input-pasaran").value;

        neptuUser = hitungNeptuUser(hariUser, pasaranUser);

        document.getElementById("hasil-info").textContent = `Neptu Kamu : ${neptuUser} (${hariUser} ${pasaranUser})`;

    } else if (mode === "tanggal-lahir") {
        const tanggalLahirInput = document.getElementById("input-tanggal-lahir").value;
        const bagian = tanggalLahirInput.split("-");
        
        const tahunLahir = parseInt(bagian[0]);
        const bulanLahir = parseInt(bagian[1]);
        const tanggalLahir = parseInt(bagian[2]);
        
        if (tahunLahir >= 2000 && tahunLahir <= 2030) {
            // Ambil dari JSON lokal
            const response = await fetch(`/calendar/calendar_${tahunLahir}.json`);
            const data = await response.json();
            
            const namaBulan = ["january", "february", "march", "april", "may", "june", 
                            "july", "august", "september", "october", "november", "december"];
            const bulanNama = namaBulan[bulanLahir - 1];
            
            const dataBulan = data[bulanNama];
            const dataHariLahir = dataBulan.find(item => item.day === tanggalLahir);
            
            neptuUser = hitungNeptuUser(dataHariLahir.weekday, dataHariLahir.pasaran); 

            document.getElementById("hasil-info").textContent = `Neptu kamu: ${neptuUser} (${dataHariLahir.weekday} ${dataHariLahir.pasaran})`; 
            
        } else {
            document.getElementById("hasil-info").textContent = "Maaf, saat ini kalender hanya mendukung tahun 2000-2030. Coba input tanggal lahir dalam rentang tersebut.";
        }
    }

    if (neptuUser !== null) {
        const bulanTargetInput = document.getElementById("input-bulan-target").value; // format: "2026-07"
        const bagianTarget = bulanTargetInput.split("-");
        
        currentYear = parseInt(bagianTarget[0]);
        currentMonth = parseInt(bagianTarget[1]) - 1; // kenapa -1 lagi di sini? coba inget alasan yg sama kayak sebelumnya
        
        updateKalender();
        ambilDataKalender(neptuUser);
        document.getElementById("bulan-tahun-label").textContent = `${getNamaBulan(currentMonth)} ${currentYear}`;

        document.getElementById("form-input-section").classList.add("hidden");
        document.getElementById("btn-ubah-weton").classList.remove("hidden");
        document.getElementById("legend-section").classList.remove("hidden");
    }
});

// Event listener for the "Ubah Weton" button       
document.getElementById("btn-ubah-weton").addEventListener("click", function() {
    document.getElementById("form-input-section").classList.remove("hidden");
    document.getElementById("btn-ubah-weton").classList.add("hidden");
    document.getElementById("legend-section").classList.add("hidden");
    
    ambilDataKalender();
    document.getElementById("hasil-info").textContent = "";
});

renderLegend();

document.getElementById("dn").addEventListener("change", function() {
    document.documentElement.classList.toggle("dark", this.checked);
});