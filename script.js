window.onload = function () {
    loadTasks();
};

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = [];

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const todoText = input.value.trim();
   
    if (!todoText) {
        alert('Please enter a task.');
        return;
    }
    
    addTask(todoText);
    input.value = ''; // Clear the input field

});
    
    // Create a new list item
const addTask = (text, fromStorage = false) => {
    const newTask = document.createElement('li');
    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    newTask.appendChild(textSpan);

    //Add an edit button
    const editBtn = document.createElement('button')
    editBtn.textContent = "Edit";
    newTask.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
        const index = tasks.indexOf(text);
        const newText = prompt("Edit your task:", textSpan.textContent);
        if (newText && newText.trim() !== "") {
            textSpan.textContent = newText;
            if (index !== -1) {
                tasks[index] = newText;
                saveTasks();
            }
        }


    });

    // Add a delete button to the new task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    newTask.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        deleteTask(newTask, text);
    });

    // Mark task as completed
    newTask.addEventListener('click', (e) => {
        if (e.target !== deleteBtn) {
            toggleComplete(newTask);
        }

    });

    list.appendChild(newTask);

    if (!fromStorage) {
        tasks.push(text);
        saveTasks();
    }
}

const editTask = () => {

}

const deleteTask = (currentTask, taskText) => {
    currentTask.remove();
    tasks = tasks.filter(t => t !== taskText)
    saveTasks()
}

const toggleComplete = (currentTask) => {
    currentTask.classList.toggle("completed");
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => addTask(task, true));
    }
}
    



    
