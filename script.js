const todoList = document.querySelector('.todo-list');
const uncheckedTodo = [];
const checkedTodo = [];
let radioName = 1;

class Todo {
  constructor(todoName, priority, todoTag) {
    this.priority = priority;

    // create todo
    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML =
      document.querySelector('.todo-title-template').innerHTML +
      document.querySelector('.todo-info-template').innerHTML;

    this.todoName = this.element.querySelector('.todo-name');
    this.todoName.value = todoName;
    this.todoName.setAttribute('checked', 'false');

    this.element.querySelector('.todo-tag').value = todoTag;

    // set todoCheckbox color according to priority
    this.todoCheckbox = this.element.querySelector('.todo-checkbox');

    this.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.name = radioName;
      radio.addEventListener('change', (event) => {
        this.priority = event.target.className;
        this.update();
      })
    });
    radioName++;

    this.element.querySelector(`.${priority}`).checked = true;

    this.svg = this.element.querySelector('svg');

    this.update();
    this.addEvent();
  }

  update() {
    if(this.priority == 'high') {
      this.todoCheckbox.style.borderColor = '#f38ba8';
      this.todoCheckbox.style.setProperty('--checkbox-background', '#f38ba8');
    }
    else if(this.priority == 'mid') {
      this.todoCheckbox.style.borderColor = '#f9e2af';
      this.todoCheckbox.style.setProperty('--checkbox-background', '#f9e2af');
    }
    else {
      this.todoCheckbox.style.borderColor = '#a2a2a2';
      this.todoCheckbox.style.setProperty('--checkbox-background', '#a2a2a2');
    }
  }

  addEvent() {
    // expand todo
    this.element.addEventListener('click', (event) => {
      if(event.target != this.todoCheckbox) {
        this.element.style.maxHeight = '210px';
        this.todoName.style.pointerEvents = 'auto'; 
      }
    });

    // shrink todo
    document.addEventListener('click', (event) => {
      if(event.target != this.element &&
        !this.element.contains(event.target)) {
        this.element.style.maxHeight = '50px';
        this.todoName.style.pointerEvents = 'none'; 
      }
    });

    // toggle todoCheckbox
    this.todoCheckbox.addEventListener('click', () => {
      if(this.todoCheckbox.getAttribute('checked') == 'false') {
        this.todoCheckbox.setAttribute('checked', 'true');
        this.svg.setAttribute('checked', 'true');
        this.todoName.setAttribute('checked', 'true');

        uncheckedTodo.splice(uncheckedTodo.indexOf(this), 1);
        checkedTodo.push(this);
      }
      else {
        this.todoCheckbox.setAttribute('checked', 'false');
        this.svg.setAttribute('checked', 'false');
        this.todoName.setAttribute('checked', 'false');

        checkedTodo.splice(checkedTodo.indexOf(this), 1);
        uncheckedTodo.push(this);
      }

      updateList();
    });
  }
}

const todoCreator = document.querySelector('.todo-creator');
todoCreator.innerHTML += document.querySelector('.todo-info-template').innerHTML;
todoCreator.querySelector('.low').checked = true;

// set the same name to avoid multiple choice
todoCreator.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.name = 0;
});

// expand the todoCreator
const inputName = document.querySelector('.input-name');
inputName.addEventListener('focus', () => {
  todoCreator.style.maxHeight = '210px';
})

// shrink the todoCreator
document.addEventListener('click', (event) => {
  if(event.target != inputName && !todoCreator.contains(event.target)) {
    todoCreator.style.maxHeight = '50px';
  }
})

// update the todo list
function updateList() {
  checkedTodo.forEach((todo) => {
    todoList.insertBefore(todo.element, todoCreator.nextSibling);
  });
  uncheckedTodo.forEach((todo) => {
    todoList.insertBefore(todo.element, todoCreator.nextSibling);
  });
}

// create a new todo when press Enter
todoCreator.addEventListener('keydown', (event) => {
  if(event.code=='Enter' && inputName.value!='') {
    const priority = todoCreator.querySelector('input[type="radio"]:checked');
    const todoTag = todoCreator.querySelector('.todo-tag');

    // create a new todo
    uncheckedTodo.push(new Todo(inputName.value,
      priority.className, todoTag.value));

    // set the default value after adding a new todo
    inputName.value = '';
    todoCreator.querySelector('.low').checked = true;
    todoTag.value = '';

    // display the todo list
    uncheckedTodo.forEach((todo) =>
      todoList.insertBefore(todo.element, todoCreator.nextSibling));
  }
});
