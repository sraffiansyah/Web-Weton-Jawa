async function ambilDataKalender() {
    const response = await fetch(`/calendar/calendar_${currentYear}.json`);
    const data = await response.json();

    const namaBulan = ["january", "february", "march", "april", "may", "june", 
                    "july", "august", "september", "october", "november", "december"];

    const bulanIni = namaBulan[currentMonth]; // ambil nama bulan sesuai index
    const dataBulanIni = data[bulanIni]; // ambil array data bulan itu dari JSON

    renderKalender(dataBulanIni);
}

ambilDataKalender();

