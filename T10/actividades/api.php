<?php

function connectToDatabase() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tema10";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function getNames() {
    $nombres = array();
    $conn = connectToDatabase();
    $result = $conn->query("SELECT nombre FROM datos");

    while ($row = $result->fetch_assoc()) {
        $nombres[] = $row['nombre'];
    }

    $conn->close();
    echo json_encode($nombres);
}

function getNameDetails($selectedName) {
    $conn = connectToDatabase();
    $result = $conn->query("SELECT * FROM datos WHERE nombre = '$selectedName'");
    $detalles = $result->fetch_assoc();

    $conn->close();
    echo json_encode($detalles);
}
?>
