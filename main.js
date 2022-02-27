// caching the DOM
const todoForm = document.querySelector('.form');          //todo form
const todoInput = document.querySelector('.todo-input');        //input box
const todoItemsList = document.querySelector('.todo-items');    // ul 

let todos = [];   // array for ToDo's

// event listener for form 
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();     //prevent page from reloading when submitting form
    addTodo(todoInput.value);   // call addTodo function with input box value
});

// add ToDo function 
function addTodo(item) {
    if (item !== '') {          // if input is not empty
        const todo = {          // takes input and creates object(JSON syntax!)
            id: Date.now(),
            name: item, 
            completed: false
    };
        todos.push(todo);           //add item to array
        addToLocalStorage(todos)    // stores and then run the render function 
        todoInput.value = '';       // clears text box
    }
};

function renderTodos(todos) {               // renders to the <ul> takes the array as arguments
    todoItemsList.innerHTML = '';           // clears the <ul> 
    todos.forEach(function(item) {          // loops through array   
        const checked = item.completed ? 'checked' : null;      // checks if item is completed
        const li = document.createElement('li');                // create <li>
        li.setAttribute('class', 'item');                       // set li class "item"
        li.setAttribute('data-key', item.id);                 // set data-key to item id
        if (item.completed === true) {                          // line through completed
            li.classList.add('checked');
        }                                                       // assign text to <li>
        li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>  
        ${item.name}
        <button class="delete-button">X</button>`;
        todoItemsList.append(li);                               // assign <li> to <ul>
    });
}    

function addToLocalStorage(todos) {                             // add to localStorage w/ arrays as arguments
    localStorage.setItem('todos', JSON.stringify(todos));       // convert array to JSON string (key = 'todos'/value=array)
    renderTodos(todos);                                         // runs entire render function after saving to localStorage to show changes
}

function getFromLocalStorage() {                                // function to get storage
    const reference = localStorage.getItem('todos');            // variable for items
    if (reference) {                                            // if exists
        todos = JSON.parse(reference);                          // array = parse the storage
        renderTodos(todos);                                     // run the render function to show them
    } 
}

function toggle(id) {                                       // toggle to complete or not complete  
    todos.forEach(function(item) {                          // loop takes each item as argument  
        if (item.id == id) {                                // if item id matches
            item.completed = !item.completed;               // item.completed = false
        }                                                   // us == not === cause of different types
    })
    addToLocalStorage(todos);                           // update list function
}

function deleteTodo(id) {                                   // delete a todo
    todos = todos.filter(function(item) {                   // filter() array, takes each item as argument
        return item.id != id;                               // filters out <li> with id and updates array
    });                                                     // return item.id == false ... makes new array of item.id false
        addToLocalStorage(todos)                            // update list function
}

getFromLocalStorage();                                              // initialize function to get storage and show 

todoItemsList.addEventListener('click', function(event) {           // function listen to delete and check 'clicks'
    if (event.target.type === 'checkbox') {                                          // if click is checkbox 
        toggle(event.target.parentElement.getAttribute('data-key'));                 // toggle the state
    }
    if (event.target.classList.contains('delete-button')) {                          // if click is delete
        deleteTodo(event.target.parentElement.getAttribute('data-key'));  // (get id from data-key attributes value                   
    }                                                                     // of parent <li> where the delte-button 
});                                                                       // is present.)