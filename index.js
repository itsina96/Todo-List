// Defind variables 
const date = document.querySelector('#date');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clearBtn');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

/**** Load all event listeners ****/
loadEventListeners();

function loadEventListeners() {
    // DOM load event - for tasks from storage to be displayed
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add-task event
    form.addEventListener('submit', addTask);
    // Remove-task event
    taskList.addEventListener('click', removeTask);
    // Clear-all-task event
    clearBtn.addEventListener('click', clearAll);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Localstorage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // add task 에서 했던거 그대로 똑같이, 
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));
    
        // Create new link element - for icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-minus"></i>';
        // Append link to the li 
        li.appendChild(link);

        // finally Append the li to the ul!
        taskList.appendChild(li);
    });
}

// Add-Task 
function addTask(e) {
    if(taskInput.value === '') {
        alert('Uh oh, you left your input empty. Please add a task');
    } else {

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create new link element - for icon
    const link = document.createElement('a');
    link.className = 'delete-item';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-minus"></i>';

    // Append link to the li 
    li.appendChild(link);

    // finally Append the li to the ul!
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    }
    // once we do that, Clear the input so next task could be written
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove-tasks - using event delegation
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        // Remove from LS as well
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove-tasks - from LS as well
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear-all-tasks
function clearAll() {
    // you can do below, but it's not faster than while version
    // taskList.innerHTML = '';
    if(confirm('Are you sure to clear all? You cannot undo this action.')) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    }
    // All clear from LS as well
    clearAllTaskFromLocalStorage();
}

// Clear all tasks from LS
function clearAllTaskFromLocalStorage() {
    localStorage.clear();
}

// Filter-tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}


/**** Show Date ****/
let options = { weekday:'long', month:'short', day:'numeric'};
let today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

