document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("circleBottom").style.display = "none"; 
        let box = document.getElementById("roundedBox");
        box.style.bottom = "0";  
        box.style.opacity = "1";
    }, 4000);
});

function goToHome() {
    console.log("Navigating to homepage...");
    window.location.href = "../0.login/login.html";
}
document.addEventListener("DOMContentLoaded", function() {
    const manfaatList = [
        "Manfaat Jahe: Menghangatkan tubuh, meredakan mual, meningkatkan pencernaan, mengurangi nyeri otot, anti-inflamasi, meningkatkan daya tahan tubuh.",
        "Manfaat Kunyit: Antioksidan, anti-inflamasi, memperbaiki pencernaan, meningkatkan daya tahan tubuh, membantu kesehatan hati, mengurangi nyeri sendi, mendukung kesehatan kulit.",
        "Manfaat Asam Jawa: Melancarkan pencernaan, kaya vitamin C, antioksidan, menurunkan kolesterol, mengatasi sembelit, menyegarkan tubuh, menjaga kesehatan jantung, meningkatkan metabolisme."
    ];

    const randomIndex = Math.floor(Math.random() * manfaatList.length);
    const selectedManfaat = manfaatList[randomIndex];
    document.getElementById("manfaatText").innerText = selectedManfaat;
});
