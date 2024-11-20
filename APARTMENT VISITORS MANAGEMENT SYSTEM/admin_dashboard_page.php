<?php
session_start();
if (!isset($_SESSION['loggedin'])) {
    header('Location: admin_login.php');
    exit;
}

$servername = "localhost";
$username = "pma";
$password = "root";
$dbname = "visitor_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Count today's visitors
$today = date('Y-m-d');
$sql_today = "SELECT COUNT(*) as count FROM visitors WHERE DATE(visit_time) = '$today'";
$result_today = $conn->query($sql_today);
$row_today = $result_today->fetch_assoc();

// Fetch all visitors
$sql_visitors = "SELECT * FROM visitors";
$result_visitors = $conn->query($sql_visitors);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="dashboard">
        <h2>Admin Dashboard</h2>
        <p>Number of visitors today: <?php echo $row_today['count']; ?></p>

        <h3>Visitor Records</h3>
        <table>
            <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Relation</th>
                <th>Room</th>
                <th>Reason</th>
                <th>Visit Time</th>
            </tr>
            <?php while ($row = $result_visitors->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['contact']; ?></td>
                <td><?php echo $row['relation']; ?></td>
                <td><?php echo $row['room']; ?></td>
                <td><?php echo $row['reason']; ?></td>
                <td><?php echo $row['visit_time']; ?></td>
            </tr>
            <?php } ?>
        </table>
    </div>
</body>
</html>
<?php
$conn->close();
?>
