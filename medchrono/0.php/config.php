<?php
$host = "localhost";
$user = "root"; // Ganti jika ada username lain
$pass = ""; // Ganti dengan password MySQL jika ada
$dbname = "aplikasi_obat";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
