document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const scheduleList = document.getElementById("scheduleList");

    // Cek apakah data ada di localStorage, jika tidak, buat data dummy
    if (!localStorage.getItem("schedules")) {
        localStorage.setItem("schedules", JSON.stringify([
            { nama: "Paracetamol", jam: 8, menit: 0, keterangan: "Sebelum makan" },
            { nama: "Amoxicillin", jam: 10, menit: 30, keterangan: "Sesudah makan" },
            { nama: "Ibuprofen", jam: 14, menit: 45, keterangan: "Saat sakit" }
        ]));
    }

    function loadSchedules(query = "") {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        scheduleList.innerHTML = "";

        let filteredSchedules = schedules.filter(schedule =>
            schedule.nama.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSchedules.length === 0) {
            scheduleList.innerHTML = "<p class='text-muted'>Tidak ada jadwal ditemukan.</p>";
            return;
        }

        filteredSchedules.forEach(schedule => {
            let item = document.createElement("div");
            item.classList.add("schedule-item");

            // Format jam dan menit menjadi hh:mm
            let waktuFormatted = `${String(schedule.jam).padStart(2, "0")}:${String(schedule.menit).padStart(2, "0")}`;

            item.innerHTML = `
                <strong>${schedule.nama}</strong><br>
                <span>🕒 Waktu: ${waktuFormatted}</span><br>
                <span>📌 Keterangan: ${schedule.keterangan || "-"}</span>
            `;
            scheduleList.appendChild(item);
        });
    }

    searchButton.addEventListener("click", function () {
        loadSchedules(searchInput.value);
    });

    searchInput.addEventListener("keyup", function () {
        loadSchedules(searchInput.value);
    });

    loadSchedules(); // Load awal saat halaman dibuka
});
