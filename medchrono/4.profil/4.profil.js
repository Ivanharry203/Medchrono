$(document).ready(function () {
    function loadProfile() {
        $.ajax({
            url: "../0.php/ambil_profil.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    $("#profile-name").text(data.name);
                    $("#profile-age").text("Umur: " + data.age);
                    $("#inputName").val(data.name);
                    $("#inputAge").val(data.age);
                } else {
                    $("#profile-name").text("Nama tidak ditemukan");
                    $("#profile-age").text("Umur: -");
                }
            },
            error: function () {
                alert("Gagal memuat profil.");
            }
        });
    }

    loadProfile();

    $("#saveProfile").click(function () {
        let name = $("#inputName").val().trim();
        let age = $("#inputAge").val().trim();

        if (name === "" || age === "") {
            alert("Nama dan umur tidak boleh kosong.");
            return;
        }

        $.ajax({
            url: "../0.php/perbarui_profil.php",
            method: "POST",
            data: { name: name, age: age },
            success: function (response) {
                alert(response);
                $("#profileModal").modal("hide");
                loadProfile();
            },
            error: function () {
                alert("Gagal menyimpan perubahan.");
            }
        });
    });
});
