<?php
// Database connection
$servername = "localhost";
$username = "root";  // default username for XAMPP
$password = "";      // no password by default
$dbname = "visitor_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$contact = $_POST['contact'];
$relation = $_POST['relation'];
$room = $_POST['room'];
$reason = $_POST['reason'];
$time = $_POST['time'];

// Insert data into the visitors table
$sql = "INSERT INTO visitors (name, contact, relation, room, reason, visit_time)
        VALUES ('$name', '$contact', '$relation', '$room', '$reason', '$time')";

if ($conn->query($sql) === TRUE) {
    echo "New visitor record created successfully";
    // Redirect to a success page or back to the form
    header('Location: index.html');
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
