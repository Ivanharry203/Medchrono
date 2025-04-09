<?php
include 'config.php';

if (!isset($_SESSION['username'])) {
    echo "Gagal: Anda belum login.";
    exit;
}

$username = $_SESSION['username']; 
$nama_baru = $_POST['name'];
$umur_baru = $_POST['age'];

$query = "UPDATE users SET fullname = ?, age = ? WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("sis", $nama_baru, $umur_baru, $username);

if ($stmt->execute()) {
    echo "Profil berhasil diperbarui.";
} else {
    echo "Gagal memperbarui profil.";
}

$stmt->close();
$conn->close();
?>
