const todolist = document.getElementById('todolist');
const template = document.getElementsByTagName('template')[0];

class Todo {
  constructor(content, tag) {
    this.tag = tag;
    this.content = content; // debug

    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML = template.innerHTML;
    this.element.querySelector('.content').innerHTML = content;

    this.checkbox = this.element.querySelector('.checkbox');
    this.svg = this.element.querySelector('svg');

    addEvent(this);
  }
}

const uncheckedTodo = [];
const checkedTodo = [];

function update() {
  uncheckedTodo.forEach((todo) => {
    todolist.append(todo.element);
  });
  checkedTodo.forEach((todo) => {
    todolist.append(todo.element);
  });
}

function addEvent(todo) {
  todo.checkbox.onclick = function() {
    if(todo.checkbox.getAttribute('checked') == 'false') {
      todo.checkbox.setAttribute('checked', 'true');
      todo.svg.setAttribute('checked', 'true');

      uncheckedTodo.splice(uncheckedTodo.indexOf(todo), 1);
      checkedTodo.push(todo);
    }
    else {
      todo.checkbox.setAttribute('checked', 'false');
      todo.svg.setAttribute('checked', 'false');

      checkedTodo.splice(checkedTodo.indexOf(todo), 1);
      uncheckedTodo.push(todo);
    }

    update();
  }
}

const newtodo = document.getElementById('newtodo');
newtodo.addEventListener('keydown', (event) => {
  if(event.code=='Enter' && newtodo.value!='') {
    uncheckedTodo.push(new Todo(newtodo.value));
    newtodo.value = '';

    uncheckedTodo.forEach((todo) => todolist.prepend(todo.element));
  }
});
