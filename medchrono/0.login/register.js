document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;

    if (username.length < 3 || password.length < 4) {
        document.getElementById("regErrorMessage").textContent = "Username minimal 3 karakter, Password minimal 4 karakter.";
        return;
    }

    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "../0.login/login.html";
});
