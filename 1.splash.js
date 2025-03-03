document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("circleBottom").style.display = "none"; 
        let box = document.getElementById("roundedBox");
        box.style.bottom = "0";  
        box.style.opacity = "1";
    }, 4000);
});

function goToHome() {
    window.location.href = "2.homepage.html";
}
document.addEventListener("DOMContentLoaded", function() {
    // Array informasi manfaat herbal
    const manfaatList = [
        "Manfaat Jahe: Menghangatkan tubuh, meredakan mual, meningkatkan pencernaan, mengurangi nyeri otot, anti-inflamasi, meningkatkan daya tahan tubuh.",
        "Manfaat Kunyit: Antioksidan, anti-inflamasi, memperbaiki pencernaan, meningkatkan daya tahan tubuh, membantu kesehatan hati, mengurangi nyeri sendi, mendukung kesehatan kulit.",
        "Manfaat Asam Jawa: Melancarkan pencernaan, kaya vitamin C, antioksidan, menurunkan kolesterol, mengatasi sembelit, menyegarkan tubuh, menjaga kesehatan jantung, meningkatkan metabolisme."
    ];

    // Pilih salah satu manfaat secara acak
    const randomIndex = Math.floor(Math.random() * manfaatList.length);
    const selectedManfaat = manfaatList[randomIndex];

    // Tampilkan teks di dalam elemen rounded box
    document.getElementById("manfaatText").innerText = selectedManfaat;
});
