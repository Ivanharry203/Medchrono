<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = trim($_POST['fullname']);
    $age = (int) $_POST['age'];
    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        echo "<script>alert('Username sudah digunakan! Pilih username lain.'); window.location.href='../0.login/register.html';</script>";
    } else {
        // Simpan data ke database
        $stmt = $conn->prepare("INSERT INTO users (fullname, age, username, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("siss", $fullname, $age, $username, $password);

        if ($stmt->execute()) {
            echo "<script>alert('Pendaftaran berhasil! Silakan login.'); window.location.href='../0.login/login.html';</script>";
        } else {
            echo "Error: " . $stmt->error;
        }
    }
    $stmt->close();
    $conn->close();
}
?>
