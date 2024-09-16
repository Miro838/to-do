<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo_list_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'add':
        $task = $conn->real_escape_string($_POST['task']);
        $sql = "INSERT INTO tasks (task, is_completed) VALUES ('$task', 'no')";
        $conn->query($sql);
        break;
    case 'edit':
        $id = (int)$_POST['id'];
        $task = $conn->real_escape_string($_POST['task']);
        $sql = "UPDATE tasks SET task='$task' WHERE id=$id";
        $conn->query($sql);
        break;
    case 'delete':
        $id = (int)$_POST['id'];
        $sql = "DELETE FROM tasks WHERE id=$id";
        $conn->query($sql);
        break;
    case 'toggleComplete':
        $id = (int)$_POST['id'];
        $result = $conn->query("SELECT is_completed FROM tasks WHERE id=$id");
        $is_completed = $result->fetch_assoc()['is_completed'];
        $new_status = ($is_completed === 'no') ? 'yes' : 'no';
        $sql = "UPDATE tasks SET is_completed='$new_status' WHERE id=$id";
        $conn->query($sql);
        break;
    default:
        $result = $conn->query("SELECT * FROM tasks");
        $tasks = [];
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
        echo json_encode($tasks);
        break;
}

$conn->close();
?>
