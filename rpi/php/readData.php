<?php

/* 
DATA SOURCES:
----
$servername = "localhost";
$username = "root";
$password = "password";

// Create connection
$conn = new mysqli("localhost", "root" "password", "exampledb");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
-----

GET DATA:

$fah = $_GET['fah'];
$hum = $_GET['hum'];
$query = "INSERT INTO readings(fahrenheit, humidity, time) VALUES $fah, $hum, $
$sql->query($query);

$uid = $_GET['uid']
$query2 = "SELECT preferred_fah, preferred_hum FROM user_preferences WHERE use$
$result = $sql->query($query2);
$row = $result->fetch_assoc();
  
*/
?>