<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Koneksi gagal']));
}

header('Content-Type: application/json');

if (!isset($_SESSION['id_user'])) {
    echo json_encode(['status' => 'error', 'message' => 'Harap login terlebih dahulu']);
    exit();
}

$id_user = $_SESSION['id_user'];
$jadwal = [];

$stmt = $conn->prepare("SELECT id, nama_obat, keterangan_kondisi, waktu_minum, keterangan_lainnya FROM jadwal_obat WHERE id_user = ? ORDER BY waktu_minum ASC");
$stmt->bind_param('i', $id_user);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $jadwal[] = [
        'id' => $row['id'],
        'nama_obat' => $row['nama_obat'],
        'keterangan_kondisi' => $row['keterangan_kondisi'],
        'waktu_minum' => date('H:i', strtotime($row['waktu_minum'])), // hanya jam:menit
        'keterangan_lainnya' => $row['keterangan_lainnya']
    ];
}

echo json_encode($jadwal);
?>
