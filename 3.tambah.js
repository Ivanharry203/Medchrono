document.addEventListener("DOMContentLoaded", function () {
    const addScheduleBtn = document.getElementById("addScheduleBtn");
    const scheduleModal = new bootstrap.Modal(document.getElementById("scheduleModal"));
    const medicineForm = document.getElementById("medicineForm");
    const scheduleList = document.getElementById("scheduleList");
    const timeInputs = document.getElementById("timeInputs");

    // Buka modal tambah jadwal obat
    addScheduleBtn.addEventListener("click", function () {
        scheduleModal.show();
    });

    // Reset form saat tombol reset ditekan
    document.getElementById("resetForm").addEventListener("click", function () {
        medicineForm.reset();
        document.querySelectorAll(".time-input").forEach((input, index) => {
            if (index !== 0) input.parentElement.remove();
        });
    });

    // Tambah atau hapus input waktu
    timeInputs.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-time")) {
            let newInput = document.createElement("div");
            newInput.classList.add("input-group", "mb-2");
            newInput.innerHTML = `
                <input type="time" class="form-control time-input" required>
                <button type="button" class="btn btn-outline-danger remove-time">-</button>
            `;
            timeInputs.appendChild(newInput);
        } else if (e.target.classList.contains("remove-time")) {
            e.target.parentElement.remove();
        }
    });

    // Simpan data ke localStorage
    medicineForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const medicineName = document.getElementById("medicineName").value.trim();
        const condition = document.getElementById("condition").value.trim();
        const additionalInfo = document.getElementById("additionalInfo").value.trim();
        const timeValues = [...document.querySelectorAll(".time-input")].map(input => input.value.trim());

        if (medicineName && timeValues.length > 0) {
            let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
            medicines.push({ medicineName, condition, timeValues, additionalInfo });
            localStorage.setItem("medicines", JSON.stringify(medicines));

            displayMedicines();
            scheduleModal.hide();
            showNotification(`Jadwal obat "${medicineName}" berhasil disimpan!`);
        } else {
            alert("Harap isi semua data dengan benar!");
        }
    });

    // Menampilkan jadwal obat yang tersimpan
    function displayMedicines() {
        let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        scheduleList.innerHTML = "";

        medicines.forEach(med => {
            let item = document.createElement("div");
            item.classList.add("medicine-item");
            item.innerHTML = `<strong>${med.medicineName}</strong> <span>${med.timeValues.join(", ")}</span>`;
            scheduleList.appendChild(item);
        });

        scheduleList.style.display = medicines.length ? "block" : "none";
    }

    // Notifikasi saat waktunya minum obat
    function checkMedicineTimes() {
        let now = new Date();
        let currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

        medicines.forEach(med => {
            if (med.timeValues.includes(currentTime)) {
                showNotification(`Waktunya minum obat: ${med.medicineName}`);
            }
        });
    }

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(message);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(message);
                }
            });
        }
    }

    setInterval(checkMedicineTimes, 60000); // Periksa setiap 1 menit
    displayMedicines();
});

// 🚀 Aktifkan ikon navbar berdasarkan halaman yang dibuka
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop();
    let iconMap = {
        "2.homepage.html": "home-icon",
        "profil.html": "profile-icon",
        "3.tambah.html": "add-icon"
    };

    if (iconMap[currentPage]) {
        document.getElementById(iconMap[currentPage]).classList.add("active");
        document.getElementById(iconMap[currentPage]).style.color = "white"; // Ubah warna ikon saat aktif
    }
});
