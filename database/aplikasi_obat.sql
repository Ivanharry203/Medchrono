-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Apr 2025 pada 06.05
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aplikasi_obat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwal_obat`
--

CREATE TABLE `jadwal_obat` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nama_obat` varchar(100) NOT NULL,
  `keterangan_kondisi` text DEFAULT NULL,
  `waktu_minum` time NOT NULL,
  `keterangan_lainnya` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jadwal_obat`
--

INSERT INTO `jadwal_obat` (`id`, `id_user`, `nama_obat`, `keterangan_kondisi`, `waktu_minum`, `keterangan_lainnya`) VALUES
(7, 1, 'sas', 'asad', '20:56:00', 'sdsd'),
(8, 1, 'ova', 'asasas', '14:00:00', 'dsddsa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullname`, `age`, `username`, `password`) VALUES
(1, 'Ivan Harry Faisya', 23, 'ivan', '$2y$10$pf44LC6faS2Z2uEz36fxH.TuUkSJQidTu2m4CyFnYUXCdp0PsJc32'),
(2, 'harana', 20, 'harana', '$2y$10$b83VreRLTWRf3bw0c8hFOuhTyAYkbIMEvn7AId4LZEvGwd2h3LpZW'),
(3, 'harana', 12, 'ivan2', '$2y$10$P6Ewu/cUS0aRM84g7yLZ5eWp4P63A4Ntt/Chh.qhGC64iOJ4WqUUK'),
(4, 'ivan harryt', 12, 'ivan3', '$2y$10$eT8qbQfaPM4Jp2cFGtxZUOR1Ncra630OuumbmFKEVnvVzDGF2z9um'),
(5, 'bayu', 23, 'bayu', '$2y$10$y6HSVf/Q//STZFbUAaJi5uPQSYcO0XW0XABOXckF04fhIHOofzQu.');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `jadwal_obat`
--
ALTER TABLE `jadwal_obat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_jadwal` (`id_user`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `jadwal_obat`
--
ALTER TABLE `jadwal_obat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `jadwal_obat`
--
ALTER TABLE `jadwal_obat`
  ADD CONSTRAINT `fk_user_jadwal` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
