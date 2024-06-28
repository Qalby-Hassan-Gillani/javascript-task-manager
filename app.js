// Retrieve tasks from local storage or initialize an empty array
debugger
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');

// Render tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = `task flex justify-between items-center p-2 border rounded-lg ${task.completed ? 'bg-green-100 line-through' : 'bg-white'}`;
        taskElement.innerHTML = `
            <span>${task.text.replace(/\n/g, '<br>')}</span>
            <div class="space-x-2">
                <button onclick="editTask(${index})" class="bg-yellow-500 text-white p-1 rounded">Edit</button>
                <button onclick="deleteTask(${index})" class="bg-red-500 text-white p-1 rounded">Delete</button>
                <button onclick="toggleTaskCompletion(${index})" class="bg-blue-500 text-white p-1 rounded">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
};

// Add task
const addTask = () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveAndRenderTasks();
    }
};

// Edit task
const editTask = (index) => {
    const newText = prompt('Edit task', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveAndRenderTasks();
    }
};

// Delete task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveAndRenderTasks();
};

// Toggle task completion
const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveAndRenderTasks();
};

// Save tasks to local storage and render
const saveAndRenderTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Event listener for adding a task
addTaskBtn.addEventListener('click', addTask);

// Initial render
renderTasks();