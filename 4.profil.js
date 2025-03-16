$(document).ready(function () {
    // Ambil data dari localStorage
    let savedName = localStorage.getItem("profileName") || "Belum ada Akun";
    let savedDisease = localStorage.getItem("profileDisease") || "-";
    let savedAge = localStorage.getItem("profileAge") || "-";
    let savedImage = localStorage.getItem("profileImage");

    // Tampilkan data di halaman profil
    $("#profile-name").text(savedName);
    $("#profile-disease").text("Penyakit: " + savedDisease);
    $("#profile-age").text("Umur: " + savedAge);
    if (savedImage) {
        $("#profile-img").attr("src", savedImage);
    }

    // Jika sudah ada profil, ubah tombol menjadi "Edit Profile"
    if (savedName !== "Belum ada Akun") {
        $("#btn-text").text("Edit Profile");
        $("#profileModalLabel").text("Edit Profile");
    }

    // Saat modal dibuka, isi input dengan data yang sudah ada
    $("#profileModal").on("show.bs.modal", function () {
        $("#inputName").val(localStorage.getItem("profileName") || "");
        $("#inputDisease").val(localStorage.getItem("profileDisease") || "");
        $("#inputAge").val(localStorage.getItem("profileAge") || "");
    });

    // Saat tombol simpan ditekan
    $("#saveProfile").click(function () {
        let name = $("#inputName").val().trim();
        let disease = $("#inputDisease").val().trim();
        let age = $("#inputAge").val().trim();

        // Simpan data jika ada input
        if (name) {
            localStorage.setItem("profileName", name);
            $("#profile-name").text(name);
        }
        if (disease) {
            localStorage.setItem("profileDisease", disease);
            $("#profile-disease").text("Penyakit: " + disease);
        }
        if (age) {
            localStorage.setItem("profileAge", age);
            $("#profile-age").text("Umur: " + age);
        }

        // Simpan gambar profil jika ada file yang dipilih
        let file = $("#profileImageInput")[0].files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem("profileImage", e.target.result);
                $("#profile-img").attr("src", e.target.result);
            };
            reader.readAsDataURL(file);
        }

        // Ubah tombol menjadi "Edit Profile" setelah menyimpan
        $("#btn-text").text("Edit Profile");
        $("#profileModal").modal("hide");
    });

    // Event listener untuk reset profil ke kondisi awal
    $("#resetProfile").click(function () {
        localStorage.removeItem("profileName");
        localStorage.removeItem("profileDisease");
        localStorage.removeItem("profileAge");
        localStorage.removeItem("profileImage");

        $("#profile-name").text("Belum ada Akun");
        $("#profile-disease").text("Penyakit: -");
        $("#profile-age").text("Umur: -");
        $("#profile-img").attr("src", "default-profile.png");

        $("#btn-text").text("Tambah Profile");
        $("#profileModalLabel").text("Buat Profile");

        $("#profileModal").modal("hide");
    });
});
