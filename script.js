let tasks = [];

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('completedTasks').textContent = completed;
}

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div>No tasks yet. Add your first task above!</div>
            </div>
        `;
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        const status = document.createElement('span');
        status.className = `task-status ${task.completed ? 'status-completed' : 'status-pending'}`;
        status.textContent = task.completed ? 'Completed' : 'Pending';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(status);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = '';
    taskInput.focus();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();
