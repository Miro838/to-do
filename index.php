<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 style="text-align:center;font-weight:bold">To-Do List</h1>
        <form id="task-form">
            <input type="text" id="task-input" placeholder="Add a new task" required>
            <button type="submit" style="background-color:purple">Add Task</button>
        </form>
        <ul id="task-list">
            <!-- Tasks will be dynamically loaded here -->
        </ul>
    </div>

    <script src="scripts.js"></script>
</body>
</html>
