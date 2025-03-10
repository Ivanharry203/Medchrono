$(document).ready(function () {
    let savedName = localStorage.getItem("profileName");
    if (savedName) {
        $("#profile-name").text(savedName);
        $("#btn-text").text("Edit Profile");
        $("#profileModalLabel").text("Edit Profile");
    }

    $("#saveProfile").click(function () {
        let name = $("#inputName").val().trim();
        if (name) {
            localStorage.setItem("profileName", name);
            $("#profile-name").text(name);
            $("#btn-text").text("Edit Profile");
            $("#profileModal").modal('hide');
        }
    });
});
