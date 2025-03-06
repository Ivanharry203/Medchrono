document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const scheduleList = document.getElementById("scheduleList");

    // Cek apakah data ada di localStorage, jika tidak, buat data dummy
    if (!localStorage.getItem("schedules")) {
        localStorage.setItem("schedules", JSON.stringify([
            { nama: "Paracetamol", waktu: ["08:00", "20:00"], keterangan: "Sebelum makan" },
            { nama: "Amoxicillin", waktu: ["10:00"], keterangan: "Sesudah makan" },
            { nama: "Ibuprofen", waktu: ["14:00"], keterangan: "Saat sakit" }
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
            item.innerHTML = `
                <strong>${schedule.nama}</strong><br>
                <span>🕒 Waktu: ${schedule.waktu ? schedule.waktu.join(", ") : "-"}</span><br>
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
