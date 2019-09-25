// Declaration
const date = document.querySelector('#date');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clearBtn');
const taskInput = document.querySelector('#task');
let index = 0;
let i =0;
let old;

// Load all event listeners
loadEventListeners();

function loadEventListeners() {  
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearAll);
}

// For using checkbox
function checkID(str){
    let res;
    res = str.replace(/[^0-9]/g,"");
    return res;
}

// Get Tasks from Localstorage
function getTasks() {
    old = new Array();
    let tasks;
    
    let check = localStorage.getItem('tasks');
    console.log(check);
    if(check === null || typeof check == "undefined") {
        tasks = [];
        old=[];
        console.log(tasks);
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    
    
    tasks.forEach(function(task){
        
        let v = checkID(task.id);
        old[v]=true;
        checkedIndex(old);
        
        const eachDiv = document.createElement('div');
        eachDiv.className = 'each-div';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        checkbox.setAttribute('id', task.id);
        
        eachDiv.appendChild(checkbox);
        
        const li = document.createElement('label');
        
        li.className = 'collection-item';
        li.setAttribute('for', task.id);
        
        // Add custom checkbox for styling purpose 
        const customCheckbox = document.createElement('span');
        customCheckbox.className = 'custom-checkbox';
        li.appendChild(customCheckbox);
        
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task.value));
        
        // Create new link element - for icon
        const link = document.createElement('a');
        link.className = 'delete-item';
        // Add icon HTML
        link.innerHTML = '<i class="fas fa-times"></i>';
        
        // Append link to the li 
        li.appendChild(link);
        
        // Append the completed li to the each div
        eachDiv.appendChild(li)
        
        // finally Append each div to collection!
        taskList.appendChild(eachDiv); 
        
        
    });
    
}


// Add-Task 
function addTask(e) {
    
    if(taskInput.value == '') {
        alert('Please add a task and press the button.');
    } else {
        
        index++;
        
        const eachDiv = document.createElement('div');
        eachDiv.className = 'each-div';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('id', 'connect'+index);
        checkbox.setAttribute('name', 'contents');
        eachDiv.appendChild(checkbox);
        
        const li = document.createElement('label');
        li.className = 'collection-item';
        li.setAttribute('for', 'connect'+index);
        
        // Add custom checkbox for styling purpose
        const customCheckbox = document.createElement('span');
        customCheckbox.className = 'custom-checkbox';
        
        // Append custom checkbox to list
        li.appendChild(customCheckbox);
        // Create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        
        // Create new link element for icon
        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);

        eachDiv.appendChild(li)
        taskList.appendChild(eachDiv);
        
        storeTaskInLocalStorage(checkbox,taskInput.value,checkbox.checked);
        
    }
    taskInput.value = '';
    
    e.preventDefault();
}

// For checkbox
function checkedIndex(old){
    for(let i=0; i<old.length; i++){
        if(old[index]){
            index++;
        }else{
            index=i;
        }
    }
}

// Store Task
function storeTaskInLocalStorage(task,taskValue) {
    let tasks;
    //let ids;
    //checkedBox(task.id);
    
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
        i=0;
        //ids=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        //ids=JSON.parse(localStorage.getItem('ids'));
        
    }
    
    tasks.push({"id":task.id, "value":taskValue});
    //ids.push(checkId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //localStorage.setItem('ids', JSON.stringify(ids));
}

// Remove a task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        
        e.target.parentElement.parentElement.remove();
        // console.log(e.target.parentElement.parentElement);
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove a task from LS as well
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        
        console.log(taskItem.attributes[1].value);
        if(taskItem.attributes[1].value === task.id){
            console.log(taskItem);
            tasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear ALL tasks
function clearAll() {
    if(confirm('Are you sure you want to clear ALL? You cannot undo this action.')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
            clearAllTaskFromLocalStorage();
        }
    } 
}

// Clear All tasks from LS
function clearAllTaskFromLocalStorage() {
    localStorage.clear();
}

// Show Date
let options = { weekday:'long', month:'short', day:'numeric'};
let today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);