document.addEventListener("DOMContentLoaded", function () {
    const addScheduleBtn = document.getElementById("addScheduleBtn");
    const scheduleModal = new bootstrap.Modal(document.getElementById("scheduleModal"));
    const medicineForm = document.getElementById("medicineForm");
    const scheduleList = document.getElementById("scheduleList");
    const timeInputs = document.getElementById("timeInputs");
    const medicineDetailModal = new bootstrap.Modal(document.getElementById("medicineDetailModal"));
    let selectedMedicineIndex = null;

    // Buka modal tambah jadwal obat
    addScheduleBtn.addEventListener("click", function () {
        medicineForm.reset();
        timeInputs.innerHTML = `
            <div class="input-group mb-2">
                <input type="time" class="form-control time-input" required>
                <button type="button" class="btn btn-outline-success add-time">+</button>
            </div>`;
        selectedMedicineIndex = null; // Reset index agar tidak mengedit data lama
        scheduleModal.show();
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

    // Simpan atau edit data ke localStorage
    medicineForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const medicineName = document.getElementById("medicineName").value.trim();
        const condition = document.getElementById("condition").value.trim();
        const additionalInfo = document.getElementById("additionalInfo").value.trim();
        const timeValues = [...document.querySelectorAll(".time-input")].map(input => input.value.trim());

        if (medicineName && timeValues.length > 0) {
            let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

            if (selectedMedicineIndex !== null) {
                // Jika sedang mengedit, hapus data lama dari array
                schedules.splice(selectedMedicineIndex, 1);
            }

            timeValues.forEach(time => {
                let [jam, menit] = time.split(":").map(Number);
                schedules.push({ nama: medicineName, jam, menit, keterangan: condition || additionalInfo });
            });

            localStorage.setItem("schedules", JSON.stringify(schedules));
            displaySchedules();
            scheduleModal.hide();
            showNotification(`Jadwal obat "${medicineName}" berhasil disimpan!`);
            window.dispatchEvent(new Event("storage"));
        } else {
            alert("Harap isi semua data dengan benar!");
        }
    });

    // Menampilkan jadwal obat yang tersimpan
    function displaySchedules() {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        scheduleList.innerHTML = "";

        schedules.forEach((schedule, index) => {
            let item = document.createElement("div");
            item.classList.add("medicine-item");
            item.dataset.index = index;
            item.innerHTML = `<strong>${schedule.nama}</strong> <span>${String(schedule.jam).padStart(2, "0")}:${String(schedule.menit).padStart(2, "0")}</span>`;
            scheduleList.appendChild(item);
        });

        scheduleList.style.display = schedules.length ? "block" : "none";
    }

    // Notifikasi saat waktunya minum obat
    function checkMedicineTimes() {
        let now = new Date();
        let currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

        schedules.forEach(schedule => {
            if (`${String(schedule.jam).padStart(2, "0")}:${String(schedule.menit).padStart(2, "0")}` === currentTime) {
                showNotification(`Waktunya minum obat: ${schedule.nama}`);
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

    // Tampilkan modal detail saat item obat diklik
    scheduleList.addEventListener("click", function (e) {
        if (e.target.closest(".medicine-item")) {
            selectedMedicineIndex = e.target.closest(".medicine-item").dataset.index;
            let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
            let medicine = schedules[selectedMedicineIndex];

            document.getElementById("detailMedicineName").textContent = medicine.nama;
            document.getElementById("detailTime").textContent = `${String(medicine.jam).padStart(2, "0")}:${String(medicine.menit).padStart(2, "0")}`;
            document.getElementById("detailCondition").textContent = medicine.keterangan || "Tidak ada keterangan";

            medicineDetailModal.show();
        }
    });

    // Hapus data obat
    document.getElementById("deleteMedicine").addEventListener("click", function () {
        if (selectedMedicineIndex !== null) {
            let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
            schedules.splice(selectedMedicineIndex, 1);
            localStorage.setItem("schedules", JSON.stringify(schedules));
            displaySchedules();
            medicineDetailModal.hide();
            showNotification("Jadwal obat berhasil dihapus!");
        }
    });

    // Edit data obat
    document.getElementById("editMedicine").addEventListener("click", function () {
        if (selectedMedicineIndex !== null) {
            let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
            let medicine = schedules[selectedMedicineIndex];

            document.getElementById("medicineName").value = medicine.nama;
            document.getElementById("condition").value = medicine.keterangan || "";

            timeInputs.innerHTML = "";
            let timeInput = document.createElement("div");
            timeInput.classList.add("input-group", "mb-2");
            timeInput.innerHTML = `
                <input type="time" class="form-control time-input" value="${String(medicine.jam).padStart(2, "0")}:${String(medicine.menit).padStart(2, "0")}" required>
                <button type="button" class="btn btn-outline-success add-time">+</button>
            `;
            timeInputs.appendChild(timeInput);

            scheduleModal.show();
            medicineDetailModal.hide();
        }
    });

    displaySchedules();
});
