document.addEventListener("DOMContentLoaded", function () {
    const scheduleList = document.getElementById("scheduleList");
    const nearestSchedule = document.getElementById("nearestSchedule");

    function loadSchedules() {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        scheduleList.innerHTML = "";

        if (schedules.length === 0) {
            scheduleList.innerHTML = "<p class='text-center'>Belum ada jadwal.</p>";
            nearestSchedule.innerHTML = "<p class='text-center'>Tidak ada jadwal terdekat.</p>";
            return;
        }

        // Dapatkan waktu sekarang
        let now = new Date();
        let currentMinutes = now.getHours() * 60 + now.getMinutes();

        // Filter jadwal yang masih akan datang
        let upcomingSchedules = schedules.filter(schedule => {
            let scheduleMinutes = schedule.jam * 60 + schedule.menit;
            return scheduleMinutes >= currentMinutes; // Ambil yang belum lewat
        });

        // Jika semua jadwal sudah lewat, tetap ambil yang paling awal (reset ke besok)
        if (upcomingSchedules.length === 0) {
            upcomingSchedules = schedules;
        }

        // Urutkan berdasarkan waktu terdekat
        upcomingSchedules.sort((a, b) => (a.jam * 60 + a.menit) - (b.jam * 60 + b.menit));

        // Tampilkan jadwal terdekat
        let nearest = upcomingSchedules[0];
        nearestSchedule.innerHTML = `
            <div class="d-flex align-items-center bg-light text-dark p-2 rounded-3">
                <img src="icon/list-obat.png" class="medicine-icon me-2" alt="Obat">
                <div>
                    <strong>${nearest.nama}</strong>
                    <p class="small mb-0">${nearest.keterangan}</p>
                </div>
                <div class="ms-auto time-box">
                    <span>${String(nearest.jam).padStart(2, "0")}:${String(nearest.menit).padStart(2, "0")}</span>
                </div>
            </div>
        `;

        // Tampilkan semua jadwal
        schedules.forEach(schedule => {
            const div = document.createElement("div");
            div.classList.add("alert", "alert-light", "d-flex", "align-items-center", "justify-content-between");
            div.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="icon/list-obat.png" class="medicine-icon me-2" alt="Obat">
                    <div>
                        <strong>${schedule.nama}</strong>
                        <p class="small mb-0">${schedule.keterangan}</p>
                    </div>
                </div>
                <div class="time-box">${String(schedule.jam).padStart(2, "0")}:${String(schedule.menit).padStart(2, "0")}</div>
            `;
            scheduleList.appendChild(div);
        });
    }

    loadSchedules();

    // Update otomatis jika ada perubahan dari halaman lain
    window.addEventListener("storage", function (event) {
        if (event.key === "schedules") {
            loadSchedules();
        }
    });
});
