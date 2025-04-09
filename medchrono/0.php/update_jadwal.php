<?php
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
$id = $_POST['id'] ?? null;
$nama_obat = $_POST['nama_obat'] ?? '';
$waktu_minum = $_POST['waktu_minum'] ?? '';
if (!$id || !is_numeric($id)) {
    die("❌ ID tidak valid.");
}

if (empty($nama_obat) || empty($waktu_minum)) {
    die("❌ Nama obat dan jam harus diisi.");
}
$stmt = $conn->prepare("UPDATE jadwal_obat SET nama_obat = ?, waktu_minum= ? WHERE id = ?");
$stmt->bind_param("ssi", $nama_obat, $waktu_minum, $id);

if ($stmt->execute()) {
    echo "<script>
            alert('✅ Jadwal berhasil diperbarui!');
            window.location.href = '../3.tambah/3.tambah.html'; 
          </script>";
} else {
    echo "❌ Gagal memperbarui jadwal: " . $stmt->error;
}
$stmt->close();
$conn->close();
?>
