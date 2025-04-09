<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'aplikasi_obat');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$keyword = '';
$hasil = [];

if (isset($_GET['keyword'])) {
    $keyword = trim($_GET['keyword']);

    $stmt = $conn->prepare("SELECT nama_obat, waktu_minum FROM jadwal_obat WHERE nama_obat LIKE ?");
    $cari = "%$keyword%";
    $stmt->bind_param("s", $cari);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $hasil[] = $row;
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cari Jadwal Obat</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="5.cari.css">
</head>
<body>
<header>
    <button class="back-button" onclick="goBack()">&#8592;</button>
</header>
<div class="container mt-5">
    <h2 class="mb-4">Cari Jadwal Obat</h2>

    <form method="get" action="cari_jadwal.php" class="mb-4">
        <div class="input-group">
            <input type="text" name="keyword" class="form-control" placeholder="Masukkan nama obat..." value="<?= htmlspecialchars($keyword) ?>" required>
            <button class="btn btn-primary" type="submit">Cari</button>
        </div>
    </form>

    <?php if (!empty($hasil)): ?>
        <h5>Hasil Pencarian:</h5>
        <div class="row">
            <?php foreach ($hasil as $obat): ?>
                <div class="col-md-4">
                    <div class="card mb-3" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="showDetail('<?= htmlspecialchars($obat['nama_obat']) ?>', '<?= htmlspecialchars($obat['waktu_minum']) ?>')">
                        <div class="card-body">
                            <h5 class="card-title"><?= htmlspecialchars($obat['nama_obat']) ?></h5>
                            <p class="card-text"><?= htmlspecialchars($obat['waktu_minum']) ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php elseif (isset($_GET['keyword'])): ?>
        <div class="alert alert-warning">
            Obat dengan nama "<?= htmlspecialchars($keyword) ?>" tidak ditemukan.
        </div>
    <?php endif; ?>
</div>

<!-- Modal Detail -->
<div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="detailModalLabel">Detail Jadwal Obat</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
      </div>
      <div class="modal-body">
        <p><strong>Nama Obat:</strong> <span id="namaObat"></span></p>
        <p><strong>Waktu Minum:</strong> <span id="waktuMinum"></span></p>
      </div>
    </div>
  </div>
</div>

<script>
function showDetail(nama, waktu) {
    document.getElementById('namaObat').innerText = nama;
    document.getElementById('waktuMinum').innerText = waktu;
}
function goBack() {
    window.location.href = '../2.homepage/2.homepage.html';
}

</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
