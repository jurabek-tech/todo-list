// Get Elements
let form = document.querySelector('.todo-form');
let input = document.querySelector('.todo-input');
let list = document.querySelector('.todo-list');

// Init Array
let todos = [];

// Handle Functionality
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let value = input.value.trim();

    input.value = ''

    // Prevent Empty Todo
    if (value.length <= 0) return alert('You need to write smth _-_');

    todos.push(value)

    createTodoElement()
})

function createTodoElement() {
    list.innerHTML = ''
    todos?.reverse().forEach((todo, index) => {
        let todo_task = document.createElement('div');
        todo_task.className = 'todo-task';
        todo_task.id = `todo-${index}`
        todo_task.innerHTML = `<div class="todo-check"></div><p class="todo-text">${todo}</p><div class="todo-icons"><span class="material-symbols-outlined todo-edit">edit</span><span class="material-symbols-outlined todo-trash">delete</span></div>`

        list.appendChild(todo_task)

        let check = document.querySelector(`#todo-${index} .todo-check`);
        let edit = document.querySelector(`#todo-${index} .todo-edit`);
        let trash = document.querySelector(`#todo-${index} .todo-trash`);
        let text = document.querySelector(`#todo-${index} .todo-text`);

        check.addEventListener('click', () => {
            check.classList.toggle('checked');

            if (check.classList.contains('checked')) {
                text.innerHTML = `<del>${todo}</del>`
            } else {
                text.innerHTML = todo
            }
        })

        trash.addEventListener('click', () => {
            todos.splice(index, 1);
            createTodoElement();
        });
    })
}