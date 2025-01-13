// Get Elements
let form = document.querySelector('.todo-form');
let input = document.querySelector('.todo-input');
let list = document.querySelector('.todo-list');

// Init Array
let todos = [];
let editIndex = -1;

// Handle Functionality
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let value = input.value.trim();

    input.value = ''

    // Prevent Empty Todo
    if (value.length <= 0) return alert('You need to write smth _-_');

    if (editIndex >= 0) {
        todos[editIndex].text = value;
        editIndex = -1;
    } else {
        todos.push({
            checked: false,
            text: value
        });
    }

    createTodoElement()
})

function createTodoElement() {
    list.innerHTML = '';
    todos.slice().reverse().forEach((todo, index) => {
        let realIndex = todos.length - 1 - index;

        let todo_task = document.createElement('div');
        todo_task.className = 'todo-task';
        todo_task.id = `todo-${realIndex}`;
        todo_task.innerHTML = `<div class="todo-check"></div><p class="todo-text">${todo.text}</p><div class="todo-icons"><span class="material-symbols-outlined todo-edit">edit</span><span class="material-symbols-outlined todo-trash">delete</span></div>`;

        list.appendChild(todo_task);

        let check = document.querySelector(`#todo-${realIndex} .todo-check`);
        let edit = document.querySelector(`#todo-${realIndex} .todo-edit`);
        let trash = document.querySelector(`#todo-${realIndex} .todo-trash`);
        let text = document.querySelector(`#todo-${realIndex} .todo-text`);

        check.addEventListener('click', () => {
            check.classList.toggle('checked');
            todo.checked = !todo.checked

            if (check.classList.contains('checked')) {
                text.innerHTML = `<del>${todo.text}</del>`;
            } else {
                text.innerHTML = todo.text;
            }
        });

        if (todo.checked) {
            check.classList.add('checked')
            text.innerHTML = `<del>${todo.text}</del>`;
        } else {
            check.classList.remove('checked')
            text.innerHTML = todo.text;
        }

        edit.addEventListener('click', () => {
            input.value = todo.text;
            editIndex = realIndex;
        });

        trash.addEventListener('click', () => {
            todos.splice(realIndex, 1);
            createTodoElement();
        });
    });
}