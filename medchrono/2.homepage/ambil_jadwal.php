<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Koneksi gagal']));
}

header('Content-Type: application/json');

if (!isset($_SESSION['id_user'])) {
    echo json_encode(['status' => 'error', 'message' => 'Harap login dahulu.']);
    exit();
}

$id_user = $_SESSION['id_user'];
$sql = "SELECT nama_obat, keterangan_kondisi, waktu_minum FROM jadwal_obat WHERE id_user = ? ORDER BY waktu_minum ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id_user);
$stmt->execute();                               
$result = $stmt->get_result();

$data = [];
while($row = $result->fetch_assoc()) {
    $data[] = [
        'nama_obat' => $row['nama_obat'],
        'keterangan_kondisi' => $row['keterangan_kondisi'],
        'jam' => date('H:i', strtotime($row['waktu_minum']))

    ];
}

echo json_encode($data);
?>
