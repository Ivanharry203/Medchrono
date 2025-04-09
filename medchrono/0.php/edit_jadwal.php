<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);
} else {
    die("❌ ID tidak valid atau tidak ditemukan.");
}

$stmt = $conn->prepare("SELECT * FROM jadwal_obat WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_assoc();

if (!$data) {
    die("❌ Data tidak ditemukan untuk ID: $id");
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Jadwal Obat</title>
</head>
<body style="margin:0; padding:0; background: rgba(0,0,0,0.5); height: 100vh; display: flex; justify-content: center; align-items: center;">

<div style="background: #fff; padding: 30px; border-radius: 10px; width: 90%; max-width: 400px; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">

  <!-- Tombol X -->
  <button onclick="window.history.back();" style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 24px; cursor: pointer;">&times;</button>

  <h2 style="text-align: center; margin-bottom: 20px;">Edit Jadwal Obat</h2>

  <form action="update_jadwal.php" method="post">
    <input type="hidden" name="id" value="<?= htmlspecialchars($data['id']) ?>">

    <div style="margin-bottom: 15px;">
      <label for="nama_obat" style="display: block; margin-bottom: 5px;">Nama Obat:</label>
      <input type="text" id="nama_obat" name="nama_obat" value="<?= htmlspecialchars($data['nama_obat']) ?>" required
        style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
    </div>

    <div style="margin-bottom: 15px;">
      <label for="waktu_minum" style="display: block; margin-bottom: 5px;">Jam Minum (format HH:MM):</label>
      <input type="time" id="waktu_minum" name="waktu_minum" value="<?= htmlspecialchars($data['waktu_minum']) ?>" required
        style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
    </div>

    <button type="submit" style="width: 100%; background-color: #007bff; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">
      Simpan Perubahan
    </button>
  </form>
</div>

</body>
</html>
