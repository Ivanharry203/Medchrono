setInterval(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-time').textContent = 'Waktu Sekarang: ' + timeString;
}, 1000);

fetch('ambil_jadwal.php')
    .then(response => response.json())
    .then(data => {
        let htmlAll = '';
        let nearestObat = null;
        let smallestDiff = Infinity;

        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        data.forEach(jadwal => {
            const waktuHanyaJamMenit = jadwal.jam.slice(0, 5); 

            htmlAll += `
                <div class="schedule-card">
                    <h3>${jadwal.nama_obat}</h3>
                    <p>${jadwal.keterangan_kondisi}</p>
                    <p>${waktuHanyaJamMenit}</p>
                </div>
            `;

            const [jam, menit] = jadwal.jam.split(':').map(Number);
            const totalMinutes = jam * 60 + menit;

            let selisih = totalMinutes - nowMinutes;
            if (selisih < 0) selisih += 24 * 60;

            if (selisih < smallestDiff) {
                smallestDiff = selisih;
                nearestObat = jadwal;
            }
        });

        document.getElementById('schedule-list').innerHTML = htmlAll;

        if (nearestObat) {
            const waktuTerdekat = nearestObat.jam.slice(0, 5); 

            document.getElementById('nearest-schedule-content').innerHTML = `
                <div class="schedule-card">
                    <h3>${nearestObat.nama_obat}</h3>
                    <p>${nearestObat.keterangan_kondisi}</p>
                    <p>${waktuTerdekat}</p>
                </div>
            `;
        } else {
            document.getElementById('nearest-schedule-content').textContent = 'Tidak ada jadwal.';
        }
    });
