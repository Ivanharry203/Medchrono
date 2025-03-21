document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".btn-danger").addEventListener("click", function() {
        alert("Anda telah keluar.");
        window.location.href = "login.html"; 
    });
});
