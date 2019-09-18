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
    // Remove-a-task event
    taskList.addEventListener('click', removeTask);
    // Clear-all-task event
    clearBtn.addEventListener('click', clearAll);
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
        // Create li element
        const li = document.createElement('label');
        // Add class
        li.className = 'collection-item';
        li.setAttribute('for', 'connect');
        
        // Add checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'connect';
        li.appendChild(checkbox);
        
        // Add custom checkbox for styling purpose 
        const customCheckbox = document.createElement('span');
        customCheckbox.className = 'custom-checkbox';
        li.appendChild(customCheckbox);
        // customCheckbox.innerHTML = '<i class="fas fa-check"></i>';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        
        // Create new link element - for icon
        const link = document.createElement('a');
        link.className = 'delete-item';
        // Add icon HTML
        link.innerHTML = '<i class="fas fa-times"></i>';
        // Append link to the li 
        li.appendChild(link);
        
        // finally Append the li to the ul!
        taskList.appendChild(li);
    });
}

// Add-Task 
function addTask(e) {
    if(taskInput.value === '') {
        alert('It seems you left your input empty. Please add a task and press the button.');
    } else {
        // Create li element
        const li = document.createElement('label');
        // Add class
        li.className = 'collection-item';
        li.setAttribute('for', 'connect');
        
        // Add checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'connect';
        li.appendChild(checkbox);
        
        // Add custom checkbox for styling purpose 
        const customCheckbox = document.createElement('span');
        customCheckbox.className = 'custom-checkbox';
        li.appendChild(customCheckbox);
        
        // customCheckbox.innerHTML = '<i class="fas fa-check"></i>';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        
        // Create new link element - for icon
        const link = document.createElement('a');
        link.className = 'delete-item';
        
        // Add icon HTML
        link.innerHTML = '<i class="fas fa-times"></i>';
        
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

// Remove a task - using event delegation
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove a task - from LS as well
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

// Clear-ALL-tasks
function clearAll() {
    // you can do taskList.innerHTML = '', but it's not faster than while version
    if(confirm('Are you sure you want to clear ALL? You cannot undo this action.')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
            // All clear from LS as well
            clearAllTaskFromLocalStorage();
        }
    } 
    
}
// Clear All tasks from LS
function clearAllTaskFromLocalStorage() {
    localStorage.clear();
}

/* Show Date */
let options = { weekday:'long', month:'short', day:'numeric'};
let today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);


