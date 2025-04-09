<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}

if (!isset($_SESSION['id_user'])) {
    echo "Harap login terlebih dahulu.";
    exit();
}

$id_user = $_SESSION['id_user'];
$nama_obat = $_POST['nama_obat'];
$keterangan_kondisi = $_POST['keterangan_kondisi'];

// Format waktu hanya jam dan menit
$waktu_minum = date('H:i', strtotime($_POST['waktu_minum']));

$keterangan_lainnya = $_POST['keterangan_lainnya'];

$query = $conn->prepare("INSERT INTO jadwal_obat (id_user, nama_obat, keterangan_kondisi, waktu_minum, keterangan_lainnya) VALUES (?, ?, ?, ?, ?)");
$query->bind_param('issss', $id_user, $nama_obat, $keterangan_kondisi, $waktu_minum, $keterangan_lainnya);

if ($query->execute()) {
    echo "<script>alert('Jadwal berhasil disimpan!'); window.location.href='../3.tambah/3.tambah.html';</script>";
} else {
    echo "Terjadi kesalahan: " . $query->error;
}
?>
