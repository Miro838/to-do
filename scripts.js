document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });
});

function loadTasks() {
    fetch('tasks.php')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = task.is_completed === 'yes' ? 'completed' : '';

                li.innerHTML = `
                    <div class="task-content">
                        ${task.task}
                    </div>
                    <div class="buttons">
                        <button class="edit" onclick="editTask(${task.id})">Edit</button>
                        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                        <button class="complete" onclick="toggleComplete(${task.id})">
                            ${task.is_completed === 'yes' ? 'Undo' : 'Complete'}
                        </button>
                    </div>
                `;

                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();

    if (task) {
        fetch('tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=add&task=${encodeURIComponent(task)}`
        })
        .then(response => response.text())
        .then(() => {
            taskInput.value = '';
            loadTasks();
        });
    }
}

function editTask(id) {
    const newTask = prompt('Edit your task:');
    if (newTask !== null) {
        fetch('tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=edit&id=${id}&task=${encodeURIComponent(newTask)}`
        })
        .then(() => loadTasks());
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch('tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=delete&id=${id}`
        })
        .then(() => loadTasks());
    }
}

function toggleComplete(id) {
    fetch('tasks.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=toggleComplete&id=${id}`
    })
    .then(() => loadTasks());
}
