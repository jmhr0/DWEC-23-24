<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tema10";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, nombre FROM datos";
$result = $conn->query($sql);

$nombres = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $nombres[] = $row;
    }
}

$conn->close();

echo json_encode($nombres);
?>
