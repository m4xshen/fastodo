const todolist = document.getElementById('todolist');
const template = document.getElementsByTagName('template')[0];

class Todo {
  constructor(content, priority, tag) {
    this.priority = priority;
    this.tag = tag;

    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML = template.innerHTML;

    this.content = this.element.querySelector('.content');
    this.content.innerHTML = content;
    this.content.setAttribute('checked', 'false');

    this.checkbox = this.element.querySelector('.checkbox');
    if(priority == 'high') {
      this.checkbox.style.borderColor = 'red';
    }
    else if(priority == 'mid') {
      this.checkbox.style.borderColor = 'yellow';
    }

    this.svg = this.element.querySelector('svg');

    addEvent(this);
  }
}

const uncheckedTodo = [];
const checkedTodo = [];

function update() {
  checkedTodo.forEach((todo) => {
    todolist.insertBefore(todo.element, newtodo.nextSibling);
  });
  uncheckedTodo.forEach((todo) => {
    todolist.insertBefore(todo.element, newtodo.nextSibling);
  });
}

function addEvent(todo) {
  // toggle state when checkbox is clicked
  todo.checkbox.onclick = function() {
    if(todo.checkbox.getAttribute('checked') == 'false') {
      todo.checkbox.setAttribute('checked', 'true');
      todo.svg.setAttribute('checked', 'true');
      todo.content.setAttribute('checked', 'true');

      uncheckedTodo.splice(uncheckedTodo.indexOf(todo), 1);
      checkedTodo.push(todo);
    }
    else {
      todo.checkbox.setAttribute('checked', 'false');
      todo.svg.setAttribute('checked', 'false');
      todo.content.setAttribute('checked', 'false');

      checkedTodo.splice(checkedTodo.indexOf(todo), 1);
      uncheckedTodo.push(todo);
    }

    update();
  }
}

const newtodo = document.getElementById('newtodo');
const content = document.getElementById('content');
const tag = document.getElementById('tag');

// expand the newtodo
content.addEventListener('focus', () => {
  newtodo.style.maxHeight = '210px';
})

// shrink the newtodo
document.addEventListener('click', (event) => {
  if(event.target != content && !newtodo.contains(event.target)) {
    newtodo.style.maxHeight = '50px';
  }
})

// add a new todo when press Enter
newtodo.addEventListener('keydown', (event) => {
  if(event.code=='Enter' && content.value!='') {
    const priority = newtodo.querySelector('input[type="radio"]:checked');
    uncheckedTodo.push(new Todo(content.value, priority.id, tag.value));
    content.value = '';
    const lowPriority = document.getElementById('low');
    lowPriority.checked = true;
    tag.value = '';

    uncheckedTodo.forEach((todo) =>
      todolist.insertBefore(todo.element, newtodo.nextSibling));
  }
});
