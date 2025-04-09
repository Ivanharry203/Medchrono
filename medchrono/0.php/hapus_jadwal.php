<?php
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$id = $_GET['id'];

$sql = "DELETE FROM jadwal_obat WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Sukses dihapus.";
} else {
    echo "Gagal menghapus: " . $conn->error;
}

$conn->close();
?>
