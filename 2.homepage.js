document.addEventListener("DOMContentLoaded", function () {
    console.log("Aplikasi siap digunakan!");

    // Ambil waktu saat ini dari perangkat user
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();

    function findClosestTime(options) {
        let closestTime = options[0];
        let minDiff = Infinity;

        options.forEach(time => {
            let [hour, minute] = time.split(":").map(Number);
            let diff = Math.abs((hour * 60 + minute) - (currentHour * 60 + currentMinute));

            if (diff < minDiff) {
                minDiff = diff;
                closestTime = time;
            }
        });

        return closestTime;
    }

    let schedules = {
        "time-paracetamol": ["08:00", "07:30", "09:00"],
        "time-amoxicillin": ["08:00", "06:30", "07:30"],
        "time-omeprazole": ["06:30", "06:00", "07:00"],
        "time-loratadine": ["21:00", "20:30", "21:30"]
    };

    // Mengisi dropdown waktu dengan opsi yang tersedia
    for (let id in schedules) {
        let select = document.getElementById(id);
        schedules[id].forEach(time => {
            let option = document.createElement("option");
            option.textContent = time;
            select.appendChild(option);
        });
        select.value = findClosestTime(schedules[id]); 
    }

    // Menampilkan jadwal terdekat
    let nearestScheduleContainer = document.getElementById("nearest-medicine-list");
    nearestScheduleContainer.innerHTML = ""; 

    let allTimes = [];
    for (let id in schedules) {
        schedules[id].forEach(time => {
            allTimes.push({ time, id });
        });
    }

    // Cari waktu terdekat
    let closestTime = findClosestTime(allTimes.map(item => item.time));
    let closestSchedules = allTimes.filter(item => item.time === closestTime);

    closestSchedules.forEach(schedule => {
        let medicineItem = document.createElement("div");
        medicineItem.classList.add("medicine-item");

        let img = document.createElement("img");
        img.src = "icon/list-obat.png";
        img.classList.add("icon");

        let info = document.createElement("div");
        info.classList.add("medicine-info");

        let medicineName = "";
        switch (schedule.id) {
            case "time-paracetamol":
                medicineName = "Paracetamol 500mg";
                break;
            case "time-amoxicillin":
                medicineName = "Amoxicillin 50mg";
                break;
            case "time-omeprazole":
                medicineName = "Omeprazole 20mg";
                break;
            case "time-loratadine":
                medicineName = "Loratadine 10mg";
                break;
        }

        info.innerHTML = `<strong>${medicineName}</strong><p>${closestTime}</p>`;

        let timeBox = document.createElement("div");
        timeBox.classList.add("time-box");
        timeBox.textContent = closestTime;

        medicineItem.appendChild(img);
        medicineItem.appendChild(info);
        medicineItem.appendChild(timeBox);
        nearestScheduleContainer.appendChild(medicineItem);
    });

    // Ubah warna ikon navbar saat halaman aktif
    let currentPage = window.location.pathname.split("/").pop();
    let iconMap = {
        "2.homepage.html": "home-icon",
        "profil.html": "profile-icon",
        "tambah.html": "add-icon"
    };

    if (iconMap[currentPage]) {
        document.getElementById(iconMap[currentPage]).classList.add("active");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let storedSchedules = localStorage.getItem("medicineSchedules");

    if (storedSchedules) {
        let schedules = JSON.parse(storedSchedules);
        let medicineListContainer = document.getElementById("medicine-list");

        medicineListContainer.innerHTML = ""; // Kosongkan sebelum diisi ulang

        schedules.forEach(schedule => {
            let medicineItem = document.createElement("div");
            medicineItem.classList.add("medicine-item");

            let img = document.createElement("img");
            img.src = "icon/list-obat.png"; 
            img.classList.add("icon");

            let info = document.createElement("div");
            info.classList.add("medicine-info");

            info.innerHTML = `<strong>${schedule.name}</strong><p>${schedule.condition}</p>`;

            let timeBox = document.createElement("div");
            timeBox.classList.add("time-box");
            timeBox.textContent = schedule.times.join(", ");

            medicineItem.appendChild(img);
            medicineItem.appendChild(info);
            medicineItem.appendChild(timeBox);
            medicineListContainer.appendChild(medicineItem);
        });
    }
});
