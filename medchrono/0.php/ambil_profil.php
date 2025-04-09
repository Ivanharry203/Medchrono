<?php
session_start();
include "config.php";

if (!isset($_SESSION['id_user'])) {
    echo json_encode(["error" => "Belum login"]);
    exit;
}

$id = $_SESSION['id_user'];
$sql = "SELECT fullname, age FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($data = $result->fetch_assoc()) {
    echo json_encode(["nama" => $data["fullname"], "usia" => $data["age"]]);
} else {
    echo json_encode(["error" => "Data tidak ditemukan"]);
}
?>
