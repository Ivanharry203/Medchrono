document.addEventListener('DOMContentLoaded', function () {
  loadJadwalList();

  const popupForm = document.getElementById('popupForm');
  const addScheduleBtn = document.getElementById('addScheduleBtn');
  const closePopup = document.getElementById('closePopup');

  addScheduleBtn.onclick = function () {
      popupForm.style.display = 'block';
  };

  closePopup.onclick = function () {
      popupForm.style.display = 'none';
  };
});

function formatJamMenit(waktu) {
  return waktu.split(':').slice(0, 2).join(':');
}

function loadJadwalList() {
  fetch('../0.php/ambil1_jadwal.php')
      .then(response => response.json())
      .then(data => {
          const jadwalList = document.getElementById('jadwalList');
          jadwalList.innerHTML = '';

          data.forEach(jadwal => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <h3>${jadwal.nama_obat}</h3>
                  <p>${formatJamMenit(jadwal.waktu_minum)}</p>
              `;
              card.onclick = function () {
                  bukaModal(jadwal);
              };
              jadwalList.appendChild(card);
          });
      });
}

function bukaModal(jadwal) {
  document.getElementById('modalNamaObat').innerText = jadwal.nama_obat;
  document.getElementById('modalKondisi').innerText = jadwal.keterangan_kondisi;
  document.getElementById('modalWaktu').innerText = formatJamMenit(jadwal.waktu_minum);
  document.getElementById('modalLainnya').innerText = jadwal.keterangan_lainnya;

  const modal = document.getElementById('modalDetail');
  modal.style.display = "block";

  document.getElementById('editButton').onclick = function () {
      window.location.href = `../0.php/edit_jadwal.php?id=${jadwal.id}`;
  };

  document.getElementById('hapusButton').onclick = function () {
      if (confirm('Yakin ingin menghapus jadwal ini?')) {
          fetch(`../0.php/hapus_jadwal.php?id=${jadwal.id}`, { method: 'GET' })
              .then(response => response.text())
              .then(data => {
                  alert(data);
                  modal.style.display = "none";
                  loadJadwalList();
              });
      }
  };
}
